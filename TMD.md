# Technical Milestone & Design Document (TMD) — न्यायSetu

**Purpose:** Define exact data contracts, AgentFoundry build milestones, and verification tests for the 48-hour hackathon sprint.

---

## 1. Core JSON Data Contract (Triage Output Schema)

```json
{
  "case_id": "anon_8f2a9c",
  "language": "hi",
  "document_type": "Legal Notice (Section 138 NI Act)",
  "extraction": {
    "sender": "ABC Traders Pvt. Ltd.",
    "recipient": "Citizen (Masked)",
    "forum_or_jurisdiction": "District Court, Delhi (Pre-Litigation Notice)",
    "statutory_sections": ["Section 138, Negotiable Instruments Act, 1881"],
    "claim_amount_inr": 45000,
    "urgent_deadline": "2026-12-03",
    "source_quotes": [
      "pay the said amount of Rs. 45,000/- within 15 days from receipt of this notice"
    ]
  },
  "routing": {
    "legal_aid_eligible": true,
    "legal_aid_reason": "Income below state DLSA threshold",
    "lok_adalat_fit": "high",
    "lok_adalat_reason": "Section 138 NI Act cheque-bounce disputes are compoundable and eligible for Lok Adalat settlement."
  },
  "outputs": {
    "citizen_summary_vernacular": "...",
    "paralegal_brief_markdown": "...",
    "missing_documents_checklist": [
      "Copy of original cheque & bank return memo",
      "Envelope/postal receipt showing notice delivery date",
      "Income certificate / ration card for DLSA free legal aid"
    ]
  }
}
```

---

## 2. 48-Hour Build Milestones

| Milestone | Window | Deliverables | Exit Criteria |
| --- | --- | --- | --- |
| **M1: Repo & AF Skeleton** | Hours 0–4 | Public GitHub repo, `.env.example`, AgentFoundry workspace, basic upload UI | App accepts an image/PDF and returns raw OCR text |
| **M2: Triage & Routing Agents** | Hours 4–14 | Agents 1–3 wired with strict JSON schema + PII masking + Section 12 & Lok Adalat rules | 5 sample notices parse with zero schema errors and valid `source_quotes` |
| **M3: Dual Output & Telemetry** | Hours 14–20 | Vernacular citizen view, printable 1-page paralegal brief, anonymized pilot logger | End-to-end flow completes in < 30s on mobile browser |
| **M4: Field Pilot & Submission** | Hours 20–48 | 25–40 real pilot runs, `README.md` metrics update, 2–3 min demo video, GitHub issue | Submission issue live on `karlmehta/code-for-a-billion` |

---

## 3. Verification & Test Plan

1. **OCR Robustness Test:** Run 5 real-world degraded inputs (skewed phone photo, low-light Hindi notice, multi-page PDF summons, handwritten rent receipt, blurry image) and verify the blur guardrail triggers cleanly when unreadable.
2. **Citation Grounding Test:** Assert that every non-null `urgent_deadline` and `statutory_sections` item has a matching substring in `source_quotes`.
3. **PII Redaction Test:** Pass synthetic Aadhaar (`1234 5678 9012`), PAN (`ABCDE1234F`), and 10-digit phone numbers; verify zero unmasked matches appear in `telemetry` logs.
4. **Routing Rule Test:** Verify compoundable/pre-litigation cases (NI Act 138, traffic challan, consumer) return `lok_adalat_fit: "high"`, while non-compoundable serious criminal matters return `lok_adalat_fit: "low"` with immediate DLSA/advocate escalation.
