"""
NyaySetu — Authentication Tests
- Registration with strong/weak passwords
- Login success/failure
- Token validation
- Password hashing verification
"""

import pytest
from httpx import AsyncClient

from app.core.security import hash_password, verify_password
from app.models.user import User


class TestPasswordHashing:
    """Verify passwords are properly hashed with bcrypt."""

    def test_password_is_hashed(self):
        hashed = hash_password("MyPassword1!")
        assert hashed != "MyPassword1!"
        assert hashed.startswith("$2b$") or hashed.startswith("$2a$")  # bcrypt prefix

    def test_password_verification(self):
        hashed = hash_password("MyPassword1!")
        assert verify_password("MyPassword1!", hashed) is True
        assert verify_password("WrongPassword", hashed) is False


class TestRegistration:
    """Test user registration endpoint."""

    @pytest.mark.asyncio
    async def test_register_success(self, client: AsyncClient):
        response = await client.post("/auth/register", json={
            "email": "new@example.com",
            "password": "StrongPass1!",
            "language": "hi",
        })
        assert response.status_code == 201

    @pytest.mark.asyncio
    async def test_register_weak_password(self, client: AsyncClient):
        """Pydantic rejects weak passwords at the schema level."""
        response = await client.post("/auth/register", json={
            "email": "new@example.com",
            "password": "weak",
        })
        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_register_duplicate_email(self, client: AsyncClient, test_user: User):
        response = await client.post("/auth/register", json={
            "email": test_user.email,
            "password": "StrongPass1!",
        })
        assert response.status_code == 409


class TestLogin:
    """Test login endpoint."""

    @pytest.mark.asyncio
    async def test_login_success(self, client: AsyncClient, test_user: User):
        response = await client.post("/auth/login", json={
            "email": "test@example.com",
            "password": "TestPass1!",
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"

    @pytest.mark.asyncio
    async def test_login_wrong_password(self, client: AsyncClient, test_user: User):
        response = await client.post("/auth/login", json={
            "email": "test@example.com",
            "password": "WrongPassword1!",
        })
        assert response.status_code == 401
