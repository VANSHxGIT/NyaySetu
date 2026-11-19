"""
NyaySetu — CLI Commands
- Create admin accounts (never through the web UI)
- Run database migrations
- Trigger manual backup
"""

import asyncio
import sys

from app.core.config import settings
from app.core.database import async_session
from app.crud.users import create_user, get_user_by_email


async def create_admin(email: str, password: str, admin_secret: str):
    """Create an admin account. Requires ADMIN_SECRET."""
    if admin_secret != settings.ADMIN_SECRET:
        print("ERROR: Invalid admin secret. Check your .env file.")
        sys.exit(1)

    async with async_session() as db:
        existing = await get_user_by_email(db, email)
        if existing:
            print(f"ERROR: User {email} already exists.")
            sys.exit(1)

        user = await create_user(db, email, password, role="admin")
        await db.commit()
        print(f"Admin account created: {user.email} (id={user.id})")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python -m app.cli create-admin <email> <password> <admin_secret>")
        sys.exit(1)

    command = sys.argv[1]

    if command == "create-admin":
        if len(sys.argv) != 5:
            print("Usage: python -m app.cli create-admin <email> <password> <admin_secret>")
            sys.exit(1)
        asyncio.run(create_admin(sys.argv[2], sys.argv[3], sys.argv[4]))
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)
