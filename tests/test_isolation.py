"""
NyaySetu — Data Isolation Tests
- User A cannot see User B's cases
- Endpoints return only the authenticated user's data
- No IDOR vulnerabilities
"""

import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token, hash_password
from app.models.case import Case
from app.models.user import User


class TestDataIsolation:
    """Verify users can only access their own data."""

    @pytest.mark.asyncio
    async def test_user_sees_only_own_cases(
        self, client: AsyncClient, db_session: AsyncSession
    ):
        # Create two users
        user_a = User(email="a@test.com", hashed_password=hash_password("TestPass1!"), role="user")
        user_b = User(email="b@test.com", hashed_password=hash_password("TestPass1!"), role="user")
        db_session.add_all([user_a, user_b])
        await db_session.flush()
        await db_session.refresh(user_a)
        await db_session.refresh(user_b)

        # Create cases for each user
        case_a = Case(user_id=user_a.id, case_ref="case_a_001", language="en")
        case_b = Case(user_id=user_b.id, case_ref="case_b_001", language="en")
        db_session.add_all([case_a, case_b])
        await db_session.flush()

        # User A requests their cases
        token_a = create_access_token({"sub": user_a.id, "role": "user"})
        response = await client.get(
            "/my/cases",
            headers={"Authorization": f"Bearer {token_a}"},
        )
        print("DEBUG RESPONSE:", response.status_code, response.json())
        assert response.status_code == 200
        data = response.json()
        # User A should see only their case
        assert data["total"] == 1
        assert data["cases"][0]["case_ref"] == "case_a_001"

    @pytest.mark.asyncio
    async def test_user_cannot_access_other_users_case(
        self, client: AsyncClient, db_session: AsyncSession
    ):
        # Create two users
        user_a = User(email="x@test.com", hashed_password=hash_password("TestPass1!"), role="user")
        user_b = User(email="y@test.com", hashed_password=hash_password("TestPass1!"), role="user")
        db_session.add_all([user_a, user_b])
        await db_session.flush()
        await db_session.refresh(user_a)
        await db_session.refresh(user_b)

        # Create a case for User B
        case_b = Case(user_id=user_b.id, case_ref="secret_case", language="en")
        db_session.add(case_b)
        await db_session.flush()

        # User A tries to access User B's case
        token_a = create_access_token({"sub": user_a.id, "role": "user"})
        response = await client.get(
            "/my/cases/secret_case",
            headers={"Authorization": f"Bearer {token_a}"},
        )
        # Should return 404 (not 403, to prevent enumeration)
        assert response.status_code == 404
