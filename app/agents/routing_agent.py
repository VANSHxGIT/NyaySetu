"""
NyaySetu — Agent 3: NALSA & Lok Adalat Routing
- Evaluates free legal aid eligibility (Section 12, LSA Act 1987)
- Classifies Lok Adalat / pre-litigation mediation suitability
- Rule-based logic for compoundable offences
"""

from typing import Any

# ── Lok Adalat Eligible Categories ──
LOK_ADALAT_CATEGORIES = {
    "section 138",
    "cheque bounce",
    "traffic challan",
    "consumer dispute",
    "electricity bill",
    "water bill",
    "bank recovery",
    "rent dispute",
    "motor accident",
    "compoundable offence",
}

# ── Section 12 Eligible Categories ──
LEGAL_AID_CATEGORIES = {
    "woman",
    "child",
    "sc_st",
    "disability",
    "industrial_workman",
}


async def evaluate_routing(
    extraction: dict[str, Any],
    annual_income_band: str | None = None,
    dispute_nature: str | None = None,
) -> dict[str, Any]:
    """
    Agent 3: Evaluate legal aid eligibility and Lok Adalat suitability.
    """
    # ── Legal Aid Eligibility (Section 12) ──
    if annual_income_band == "below_threshold":
        legal_aid_eligible = True
        legal_aid_reason = "Annual income is below state DLSA statutory income ceiling"
    elif annual_income_band == "above_threshold":
        legal_aid_eligible = False
        legal_aid_reason = "Annual income exceeds standard DLSA threshold"
    else:
        legal_aid_eligible = "check_local_dlsa"
        legal_aid_reason = "Income not provided — verify eligibility at local DLSA front desk"

    # ── Lok Adalat Suitability ──
    doc_type = (extraction.get("document_type") or "").lower()
    statutory_sections = [s.lower() for s in extraction.get("statutory_sections", [])]
    combined_text = f"{doc_type} {' '.join(statutory_sections)}"

    lok_adalat_fit = "low"
    lok_adalat_reason = "Requires formal judicial hearing or non-compoundable"
    recommended_forum = "District Court"

    for category in LOK_ADALAT_CATEGORIES:
        if category in combined_text or (dispute_nature and category in dispute_nature.lower()):
            lok_adalat_fit = "high"
            lok_adalat_reason = (
                f"Eligible for Lok Adalat / Pre-Litigation settlement under "
                f"National Legal Services Authority guidelines ({category.title()})."
            )
            recommended_forum = "Lok Adalat / Pre-Litigation Mediation Cell"
            break

    return {
        "legal_aid_eligible": legal_aid_eligible,
        "legal_aid_reason": legal_aid_reason,
        "lok_adalat_fit": lok_adalat_fit,
        "lok_adalat_reason": lok_adalat_reason,
        "recommended_next_forum": recommended_forum,
    }
