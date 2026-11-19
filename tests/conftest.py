"""
NyaySetu — Test Configuration & Fixtures
- Uses an in-memory SQLite async database for isolated testing
- Sets default test env vars before app import
- Provides authenticated client fixtures
- Isolates each test with fresh database state
"""

import os

# Set test environment variables before any app imports
os.environ["DATABASE_URL"] = "sqlite+aiosqlite:///:memory:"
os.environ["JWT_SECRET_KEY"] = "super_secret_test_jwt_key_that_is_at_least_32_characters_long_123456"
os.environ["ADMIN_SECRET"] = "super_secret_admin_test_key_123456"
os.environ["AGENTFOUNDRY_API_KEY"] = "af_test_key"
os.environ["OCR_API_KEY"] = "ocr_test_key"
os.environ["LLM_API_KEY"] = "llm_test_key"
os.environ["DEBUG"] = "False"
os.environ["FORCE_HTTPS"] = "False"
os.environ["ALLOWED_HOST"] = "test"
os.environ["FRONTEND_URL"] = "http://test"

from typing import AsyncGenerator
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.pool import StaticPool

from app.core.database import Base, get_db
from app.core.security import create_access_token, hash_password
from app.main import app
from app.models.user import User


@pytest_asyncio.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """Create fresh in-memory tables and yield a clean session for each test."""
    engine = create_async_engine(
        "sqlite+aiosqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with session_factory() as session:
        yield session

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    await engine.dispose()


@pytest_asyncio.fixture
async def client(db_session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    """HTTP client with overridden DB dependency."""
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def test_user(db_session: AsyncSession) -> User:
    """Create a test user and return it."""
    user = User(
        email="test@example.com",
        hashed_password=hash_password("TestPass1!"),
        role="user",
        language="en",
    )
    db_session.add(user)
    await db_session.flush()
    await db_session.refresh(user)
    return user


@pytest_asyncio.fixture
async def admin_user(db_session: AsyncSession) -> User:
    """Create an admin user and return it."""
    user = User(
        email="admin@example.com",
        hashed_password=hash_password("AdminPass1!"),
        role="admin",
        language="en",
    )
    db_session.add(user)
    await db_session.flush()
    await db_session.refresh(user)
    return user


@pytest_asyncio.fixture
async def auth_headers(test_user: User) -> dict:
    """Authorization headers for a regular user."""
    token = create_access_token({"sub": test_user.id, "role": test_user.role})
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def admin_headers(admin_user: User) -> dict:
    """Authorization headers for an admin user."""
    token = create_access_token({"sub": admin_user.id, "role": admin_user.role})
    return {"Authorization": f"Bearer {token}"}
