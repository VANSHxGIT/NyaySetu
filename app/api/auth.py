"""
NyaySetu — Authentication Endpoints
- POST /auth/register — create account with strong password validation
- POST /auth/login — authenticate and issue JWT + refresh token
- POST /auth/refresh — rotate refresh token and issue new access token
- POST /auth/logout — revoke refresh token server-side
- Rate limited to prevent brute-force attacks
"""

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.core.rate_limit import limiter
from app.core.security import create_access_token, create_refresh_token
from app.crud.refresh_tokens import (
    revoke_all_user_tokens,
    revoke_refresh_token,
    store_refresh_token,
    validate_refresh_token,
)
from app.crud.users import authenticate_user, create_user, get_user_by_email
from app.models.user import User
from app.schemas.auth import (
    LoginRequest,
    MessageResponse,
    RegisterRequest,
    TokenResponse,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=MessageResponse, status_code=201)
@limiter.limit(settings.REGISTER_RATE_LIMIT)
async def register(
    request: Request,
    body: RegisterRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Register a new user account.
    - Email must be unique
    - Password must meet strength requirements (enforced by Pydantic schema)
    - Rate limited per IP
    """
    existing = await get_user_by_email(db, body.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists",
        )

    await create_user(db, body.email, body.password, body.language)
    return MessageResponse(message="Account created successfully. Please log in.")


@router.post("/login", response_model=TokenResponse)
@limiter.limit(settings.LOGIN_RATE_LIMIT)
async def login(
    request: Request,
    response: Response,
    body: LoginRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    Authenticate and issue tokens.
    - Rate limited per IP
    - Account locked after repeated failed attempts
    - Refresh token set as httpOnly secure cookie
    """
    user = await authenticate_user(db, body.email, body.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Create tokens
    access_token = create_access_token({"sub": user.id, "role": user.role})
    refresh_token = create_refresh_token({"sub": user.id})

    # Store refresh token hash server-side
    await store_refresh_token(db, user.id, refresh_token)

    # Set refresh token as httpOnly cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=settings.FORCE_HTTPS,
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
        path="/auth",
    )

    return TokenResponse(
        access_token=access_token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh(
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    """
    Rotate refresh token and issue a new access token.
    - Old refresh token is revoked (rotation prevents replay)
    - New refresh token set as httpOnly cookie
    """
    old_token = request.cookies.get("refresh_token")
    if not old_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token missing",
        )

    # Validate the old token
    stored = await validate_refresh_token(db, old_token)
    if stored is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )

    # Revoke old token (rotation)
    await revoke_refresh_token(db, old_token)

    # Issue new tokens
    access_token = create_access_token(
        {"sub": stored.user_id, "role": "user"}
    )
    new_refresh_token = create_refresh_token({"sub": stored.user_id})
    await store_refresh_token(db, stored.user_id, new_refresh_token)

    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=settings.FORCE_HTTPS,
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
        path="/auth",
    )

    return TokenResponse(
        access_token=access_token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


@router.post("/logout", response_model=MessageResponse)
async def logout(
    request: Request,
    response: Response,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Logout: revoke all refresh tokens for this user.
    Clears the refresh token cookie.
    """
    await revoke_all_user_tokens(db, current_user.id)

    response.delete_cookie(
        key="refresh_token", path="/auth"
    )

    return MessageResponse(message="Logged out successfully")
