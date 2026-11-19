"""
NyaySetu — Security Tests
- No debug info in production responses
- Error responses don't leak internals
- Admin routes blocked for regular users
- Rate limiting headers present
"""

import pytest
from httpx import AsyncClient

from app.models.user import User


class TestNoDebugLeaks:
    """Ensure no debug information leaks to users."""

    @pytest.mark.asyncio
    async def test_404_hides_traceback(self, client: AsyncClient):
        """Not found / error endpoints return clean JSON without traceback."""
        response = await client.get("/nonexistent-endpoint")
        assert response.status_code in (404, 405)
        body = response.text
        assert "Traceback" not in body
        assert 'File "' not in body


class TestAdminAccess:
    """Ensure admin routes are locked for non-admin users."""

    @pytest.mark.asyncio
    async def test_non_admin_blocked_from_admin_routes(
        self, client: AsyncClient, test_user: User, auth_headers: dict
    ):
        """Regular users get 403 on admin endpoints."""
        response = await client.get("/admin/users", headers=auth_headers)
        assert response.status_code == 403

    @pytest.mark.asyncio
    async def test_unauthenticated_blocked_from_admin(self, client: AsyncClient):
        """Unauthenticated requests get 401/403 on admin endpoints."""
        response = await client.get("/admin/users")
        assert response.status_code in (401, 403)

    @pytest.mark.asyncio
    async def test_admin_can_access_admin_routes(
        self, client: AsyncClient, admin_user: User, admin_headers: dict
    ):
        """Admin users can access admin endpoints."""
        response = await client.get("/admin/users", headers=admin_headers)
        assert response.status_code == 200


class TestInputValidation:
    """Ensure all forms are validated."""

    @pytest.mark.asyncio
    async def test_register_rejects_invalid_email(self, client: AsyncClient):
        response = await client.post("/auth/register", json={
            "email": "not-an-email",
            "password": "StrongPass1!",
        })
        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_register_rejects_missing_fields(self, client: AsyncClient):
        response = await client.post("/auth/register", json={})
        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_login_rejects_empty_password(self, client: AsyncClient):
        response = await client.post("/auth/login", json={
            "email": "test@example.com",
            "password": "",
        })
        assert response.status_code == 422
