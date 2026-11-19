"""
NyaySetu — Refresh Token CRUD
- Tokens stored hashed (SHA-256) — even a DB leak doesn't expose tokens
- Revocation on logout
- Rotation: old token revoked when new one is issued
"""

import hashlib
from datetime import datetime, timedelta, timezone
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.refresh_token import RefreshToken


def _hash_token(token: str) -> str:
    """Hash a refresh token for secure storage."""
    return hashlib.sha256(token.encode()).hexdigest()


async def store_refresh_token(
    db: AsyncSession, user_id: int, token: str
) -> RefreshToken:
    """Store a hashed refresh token."""
    rt = RefreshToken(
        user_id=user_id,
        token_hash=_hash_token(token),
        expires_at=datetime.now(timezone.utc)
        + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )
    db.add(rt)
    await db.flush()
    return rt


async def validate_refresh_token(
    db: AsyncSession, token: str
) -> Optional[RefreshToken]:
    """Find a valid (non-revoked, non-expired) refresh token."""
    token_hash = _hash_token(token)
    now = datetime.now(timezone.utc)
    result = await db.execute(
        select(RefreshToken).where(
            RefreshToken.token_hash == token_hash,
            RefreshToken.is_revoked == False,
        )
    )
    rt = result.scalar_one_or_none()
    if rt is None:
        return None

    # Handle timezone aware/naive comparison safely
    expires_at = rt.expires_at
    if expires_at.tzinfo is None:
        now = datetime.utcnow()
    if expires_at <= now:
        return None

    return rt


async def revoke_refresh_token(db: AsyncSession, token: str) -> None:
    """Revoke a refresh token (used on logout and rotation)."""
    token_hash = _hash_token(token)
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token_hash == token_hash)
    )
    rt = result.scalar_one_or_none()
    if rt:
        rt.is_revoked = True
        await db.flush()


async def revoke_all_user_tokens(db: AsyncSession, user_id: int) -> None:
    """Revoke all refresh tokens for a user (force logout everywhere)."""
    result = await db.execute(
        select(RefreshToken).where(
            RefreshToken.user_id == user_id,
            RefreshToken.is_revoked == False,
        )
    )
    for rt in result.scalars().all():
        rt.is_revoked = True
    await db.flush()
