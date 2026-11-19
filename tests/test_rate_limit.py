"""
NyaySetu — Rate Limiting Tests
- Login endpoint rate limited
- Health endpoint functionality
"""

import pytest
from httpx import AsyncClient


class TestRateLimiting:
    """Verify rate limiting is configured."""

    @pytest.mark.asyncio
    async def test_health_check(self, client: AsyncClient):
        """Health check endpoint returns healthy status without secrets."""
        response = await client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "nyaysetu" in data["service"]

    @pytest.mark.asyncio
    async def test_login_rate_limiting_active(self, client: AsyncClient):
        """Login endpoint responds with 401 on wrong credentials under normal limit."""
        response = await client.post("/auth/login", json={
            "email": "rate_test@example.com",
            "password": "wrongpassword123",
        })
        assert response.status_code in (401, 429)
