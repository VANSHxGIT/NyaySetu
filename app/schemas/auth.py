"""
NyaySetu — Auth Schemas (Pydantic v2)
- Strict validation on registration (password strength regex)
- Email validation via Pydantic EmailStr
- All fields typed — no raw strings accepted without constraints
"""

from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    """Registration payload — enforces strong password policy."""
    email: EmailStr
    password: str = Field(
        ...,
        min_length=8,
        max_length=128,
        pattern=r"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+])[A-Za-z\d@$!%*?&#^()\-_=+]{8,}$",
        description="Min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special character",
    )
    language: str = Field(
        default="hi",
        pattern=r"^(en|hi|mr|ta|te|bn|gu|kn)$",
        description="Preferred language code",
    )


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
