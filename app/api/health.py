"""
NyaySetu — Health Check Endpoint
- Public (no auth required)
- Returns service status without exposing any secrets or internals
"""

from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check():
    """Public health check — no secrets exposed."""
    return {"status": "healthy", "service": "nyaysetu-api"}
