"""
NyaySetu — Global Exception Handlers
- Catches all unhandled exceptions
- Logs full traceback to server logs (never exposed to users)
- Returns generic safe error messages to clients
"""

import structlog
from fastapi import HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

logger = structlog.get_logger(__name__)


async def global_exception_handler(
    request: Request, exc: Exception
) -> JSONResponse:
    """
    Catch-all handler: logs full error details server-side,
    returns a generic message to the user. No stack traces leak.
    """
    logger.error(
        "unhandled_exception",
        path=str(request.url),
        method=request.method,
        error=str(exc),
        exc_info=True,
    )
    return JSONResponse(
        status_code=500,
        content={
            "error": "internal_error",
            "message": "Something went wrong. Please try again later.",
        },
    )


async def http_exception_handler(
    request: Request, exc: HTTPException
) -> JSONResponse:
    """Return HTTP errors with consistent format, no internal details."""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": "http_error",
            "message": exc.detail,
        },
    )


async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    """
    Return which fields failed validation (safe to expose),
    but strip internal error context.
    """
    errors = []
    for err in exc.errors():
        errors.append(
            {
                "field": " -> ".join(str(loc) for loc in err["loc"]),
                "message": err["msg"],
            }
        )
    return JSONResponse(
        status_code=422,
        content={
            "error": "validation_error",
            "message": "Invalid input. Check the errors below.",
            "details": errors,
        },
    )
