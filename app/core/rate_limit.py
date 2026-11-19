"""
NyaySetu — Rate Limiting Configuration
- Per-route rate limits using slowapi
- IP-based throttling for login/register endpoints
"""

from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from starlette.requests import Request
from starlette.responses import JSONResponse


def _get_client_ip(request: Request) -> str:
    """Extract client IP, respecting X-Forwarded-For behind reverse proxy."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return get_remote_address(request)


# ── Limiter instance ──
limiter = Limiter(key_func=_get_client_ip)


async def rate_limit_exceeded_handler(
    request: Request, exc: RateLimitExceeded
) -> JSONResponse:
    """Custom 429 response with Retry-After header."""
    return JSONResponse(
        status_code=429,
        content={
            "error": "rate_limit_exceeded",
            "message": "Too many requests. Please slow down.",
        },
        headers={"Retry-After": "60"},
    )
