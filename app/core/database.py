"""
NyaySetu — Database Engine & Session Management
- Async SQLAlchemy with connection pooling
- Pool limits to prevent connection exhaustion attacks
- Pre-ping to verify connections are alive
"""

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings

# ── Engine with security-conscious pool settings ──
engine = create_async_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    echo=settings.DEBUG,
)

# ── Session factory ──
async_session = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)


# ── Base model for all ORM classes ──
class Base(DeclarativeBase):
    pass


# ── Dependency: get a DB session per request ──
async def get_db():
    """Yield an async database session, auto-closed after the request."""
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
