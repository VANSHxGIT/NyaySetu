"""
NyaySetu — FastAPI Application Entry Point

Middleware stack (applied in correct order):
1. Request ID + structured logging
2. HTTPS redirect (production only)
3. Security headers (CSP, X-Frame-Options, etc.)
4. Trusted hosts
5. CORS (strictly configured frontend origin)
6. Rate limiting (slowapi)
7. Global error handler (prevents information disclosure)

Security controls enforced:
- No Swagger UI in production (DEBUG=False)
- No error details leaked to users
- All cookies: Secure + HttpOnly + SameSite=Lax
"""

import uuid
from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from slowapi.errors import RateLimitExceeded
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware

from app.core.config import settings
from app.core.exceptions import (
    global_exception_handler,
    http_exception_handler,
    validation_exception_handler,
)
from app.core.rate_limit import limiter, rate_limit_exceeded_handler
from app.api.admin import router as admin_router
from app.api.auth import router as auth_router
from app.api.cases import router as cases_router
from app.api.health import router as health_router
from app.api.intake import router as intake_router

# ── Configure structured logging ──
structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
        structlog.processors.StackInfoRenderer(),
        structlog.dev.ConsoleRenderer() if settings.DEBUG else structlog.processors.JSONRenderer(),
    ],
    context_class=dict,
    logger_factory=structlog.PrintLoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle event context manager."""
    logger.info("nyaysetu_started", debug=settings.DEBUG, host=settings.ALLOWED_HOST)
    yield
    logger.info("nyaysetu_shutting_down")


# ═══════════════════════════════════════════
# Application Factory
# ═══════════════════════════════════════════
app = FastAPI(
    title="NyaySetu API",
    description="Voice-first vernacular legal triage & Lok Adalat router",
    version="1.0.0",
    # ── SECURITY: Disable docs in production ──
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    openapi_url="/openapi.json" if settings.DEBUG else None,
    debug=settings.DEBUG,
    lifespan=lifespan,
)


# ═══════════════════════════════════════════
# Exception Handlers (innermost layer)
# ═══════════════════════════════════════════
app.add_exception_handler(Exception, global_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)


# ═══════════════════════════════════════════
# Rate Limiter
# ═══════════════════════════════════════════
app.state.limiter = limiter


# ═══════════════════════════════════════════
# CORS — Frontend origin only
# ═══════════════════════════════════════════
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)


# ═══════════════════════════════════════════
# Trusted Host
# ═══════════════════════════════════════════
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=[settings.ALLOWED_HOST, "localhost", "127.0.0.1", "test"],
)


# ═══════════════════════════════════════════
# Security Headers Middleware
# ═══════════════════════════════════════════
@app.middleware("http")
async def add_security_headers(request: Request, call_next) -> Response:
    """Add defense-in-depth security headers to every response."""
    response = await call_next(request)

    # Prevent clickjacking
    response.headers["X-Frame-Options"] = "DENY"
    # Prevent MIME sniffing
    response.headers["X-Content-Type-Options"] = "nosniff"
    # XSS protection
    response.headers["X-XSS-Protection"] = "1; mode=block"
    # Content Security Policy
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; "
        "script-src 'self'; "
        "style-src 'self' 'unsafe-inline'; "
        "img-src 'self' data:; "
        "font-src 'self'; "
        "connect-src 'self'; "
        "frame-ancestors 'none'"
    )
    # Referrer policy
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    # Permissions policy
    response.headers["Permissions-Policy"] = (
        "camera=(), microphone=(self), geolocation=()"
    )
    # Remove server header
    if "server" in response.headers:
        del response.headers["server"]

    # HSTS (production only)
    if settings.FORCE_HTTPS:
        response.headers["Strict-Transport-Security"] = (
            "max-age=31536000; includeSubDomains"
        )

    return response


# ═══════════════════════════════════════════
# Request ID Middleware
# ═══════════════════════════════════════════
@app.middleware("http")
async def add_request_id(request: Request, call_next) -> Response:
    """Attach a unique request ID for distributed tracing and incident auditing."""
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    return response


# ═══════════════════════════════════════════
# HTTPS Redirect (production only)
# ═══════════════════════════════════════════
if settings.FORCE_HTTPS:
    app.add_middleware(HTTPSRedirectMiddleware)


# ═══════════════════════════════════════════
# Register API Routers
# ═══════════════════════════════════════════
app.include_router(health_router)
app.include_router(auth_router)
app.include_router(intake_router)
app.include_router(cases_router)
app.include_router(admin_router)
