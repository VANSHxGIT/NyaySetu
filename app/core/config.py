"""
NyaySetu — Application Configuration
Loads all settings from .env via Pydantic BaseSettings.
Crashes on startup if any required secret is missing.
"""

from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """All application settings loaded from environment variables."""

    # ── Database ──
    DATABASE_URL: str = Field(
        ..., description="PostgreSQL connection string"
    )

    # ── Authentication ──
    JWT_SECRET_KEY: str = Field(
        ..., min_length=32, description="Secret key for JWT signing"
    )
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ── Admin ──
    ADMIN_SECRET: str = Field(
        ..., description="Secret for bootstrapping admin accounts"
    )

    # ── API Keys ──
    AGENTFOUNDRY_API_KEY: str = Field(..., description="AgentFoundry API key")
    OCR_API_KEY: str = Field(..., description="OCR service API key")
    LLM_API_KEY: str = Field(..., description="LLM provider API key")

    # ── Deployment ──
    DEBUG: bool = False
    FORCE_HTTPS: bool = True
    ALLOWED_HOST: str = "localhost"
    FRONTEND_URL: str = "http://localhost:3000"

    # ── Rate Limiting ──
    LOGIN_RATE_LIMIT: str = "5/minute"
    REGISTER_RATE_LIMIT: str = "3/minute"
    ADMIN_LOGIN_RATE_LIMIT: str = "3/15minutes"
    GLOBAL_RATE_LIMIT: str = "60/minute"

    # ── Account Lockout ──
    MAX_FAILED_ATTEMPTS: int = 10
    LOCKOUT_DURATION_MINUTES: int = 30

    model_config = {"env_file": ".env", "case_sensitive": True}


settings = Settings()
