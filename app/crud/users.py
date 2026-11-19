"""
NyaySetu — User CRUD Operations
- All queries parameterized via SQLAlchemy ORM (anti-SQL injection)
- User ID always comes from JWT, never from request body
- Account lockout logic integrated
"""

from datetime import datetime, timedelta, timezone
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import hash_password, verify_password
from app.models.user import User


async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
    """Find a user by email address."""
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_user_by_id(db: AsyncSession, user_id: int) -> Optional[User]:
    """Find a user by ID."""
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def create_user(
    db: AsyncSession, email: str, password: str, language: str = "hi", role: str = "user"
) -> User:
    """Create a new user with a hashed password."""
    user = User(
        email=email,
        hashed_password=hash_password(password),
        language=language,
        role=role,
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return user


async def authenticate_user(
    db: AsyncSession, email: str, password: str
) -> Optional[User]:
    """
    Authenticate a user. Handles:
    - Account lockout check
    - Failed attempt counter increment
    - Counter reset on successful login
    """
    user = await get_user_by_email(db, email)
    if user is None:
        return None

    # Check if account is locked
    if user.is_locked():
        return None

    # Verify password
    if not verify_password(password, user.hashed_password):
        # Increment failed attempts
        user.failed_login_attempts += 1

        # Lock account if max attempts exceeded
        if user.failed_login_attempts >= settings.MAX_FAILED_ATTEMPTS:
            user.locked_until = datetime.now(timezone.utc) + timedelta(
                minutes=settings.LOCKOUT_DURATION_MINUTES
            )

        await db.flush()
        return None

    # Successful login — reset failed attempts
    user.failed_login_attempts = 0
    user.locked_until = None
    await db.flush()
    return user


async def get_all_users(db: AsyncSession) -> list[User]:
    """Admin only: get all users."""
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    return list(result.scalars().all())
