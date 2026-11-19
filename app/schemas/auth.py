"""
NyaySetu — Auth Schemas (Pydantic v2)
- Strict validation on registration (password strength validation)
- Email validation via Pydantic EmailStr
- All fields typed — no raw strings accepted without constraints
"""

import re

from pydantic import BaseModel, EmailStr, Field, field_validator


class RegisterRequest(BaseModel):
    """Registration payload — enforces strong password policy."""
    email: EmailStr
    password: str = Field(
        ...,
        min_length=8,
        max_length=128,
        description="Min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special character",
    )
    language: str = Field(
        default="hi",
        pattern=r"^(en|hi|mr|ta|te|bn|gu|kn)$",
        description="Preferred language code",
    )

    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        del cls
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one digit")
        if not re.search(r"[@$!%*?&#^()\-_=+]", v):
            raise ValueError("Password must contain at least one special character (@$!%*?&#^()-_=+)")
        return v


class LoginRequest(BaseModel):
    """Login payload."""
    email: EmailStr
    password: str = Field(..., min_length=1, max_length=128)


class TokenResponse(BaseModel):
    """JWT token response."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int  # seconds


class RefreshRequest(BaseModel):
    """Refresh token request (token sent via httpOnly cookie, this is a placeholder)."""
    pass


class MessageResponse(BaseModel):
    """Generic message response."""
    message: str
