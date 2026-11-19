"""
NyaySetu — Agent Pipeline Orchestrator
Runs the 4-agent triage chain:
  1. Intake & PII Masking
  2. Legal Triage & Deadline Extraction
  3. NALSA & Lok Adalat Routing
  4. Dual Output Synthesis
"""

from typing import Any, Optional

from app.agents.intake_agent import process_intake
from app.agents.triage_agent import extract_legal_data
from app.agents.routing_agent import evaluate_routing
from app.agents.output_agent import generate_outputs


async def run_triage_pipeline(
    file_content: bytes,
    file_type: str,
    language: str,
    voice_text: Optional[str] = None,
    annual_income_band: Optional[str] = None,
    dispute_nature: Optional[str] = None,
) -> dict[str, Any]:
    """
    Run the full 4-agent triage pipeline.
    """
    # ── Agent 1: Intake & PII Masking ──
    intake_result = await process_intake(
        file_content=file_content,
        file_type=file_type,
        language=language,
        voice_text=voice_text,
    )

    # ── Agent 2: Legal Triage & Deadline Extraction ──
    triage_result = await extract_legal_data(
        cleaned_text=intake_result["cleaned_text"],
        voice_context=intake_result.get("voice_context"),
    )

    # ── Agent 3: NALSA & Lok Adalat Routing ──
    routing_result = await evaluate_routing(
        extraction=triage_result,
        annual_income_band=annual_income_band,
        dispute_nature=dispute_nature,
    )

    # ── Agent 4: Dual Output Synthesis ──
    outputs = await generate_outputs(
        extraction=triage_result,
        routing=routing_result,
        language=language,
    )

    return {
        "document_type": triage_result.get("document_type", "Unknown"),
        "extraction": triage_result,
        "routing": routing_result,
        "citizen_summary": outputs.get("citizen_summary", ""),
        "paralegal_brief": outputs.get("paralegal_brief", ""),
        "missing_documents": outputs.get("missing_documents", []),
    }
