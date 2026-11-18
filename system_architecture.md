# System Architecture — न्यायSetu

**Platform:** AgentFoundry (AF) Multi-Agent Orchestration  
**Design Goal:** Fast, verifiable, privacy-preserving legal document triage that runs on pure software with zero hardware dependencies.

---

## 1. High-Level Pipeline

```text
[Citizen / Paralegal Mobile Web]
   │  (Photo/PDF + Vernacular Voice/Text + 4-Question Aid Check)
   ▼
[1. Intake & PII-Redaction Agent]
   │  - OCR (scanned/camera docs) & ASR (voice note -> text)
   │  - Regex/NER masking of Aadhaar, PAN, phone, bank numbers
   ▼
[2. Legal Triage & Deadline Agent]
   │  - Document classifier (Notice / Summons / FIR / Dispute)
   │  - Entity & date extractor with source-snippet grounding
   ▼
[3. NALSA & Lok Adalat Routing Agent]
   │  - Rule-based Section 12 Legal Aid eligibility check
   │  - Lok Adalat / Mediation suitability classifier
   ▼
[4. Dual-Output Synthesis Agent]
   ├──► Citizen Vernacular Brief (Plain-language + next steps + disclaimer)
   └──► Paralegal 1-Page Case Packet (Timeline + Doc Checklist + Export)
   │
   ▼
[Anonymized Criterion-4 Telemetry Store]
   (Logs triage_time_sec, doc_type, routing_decision, comprehension_delta)
```

---

## 2. Agent Responsibilities

### Agent 1: Vernacular Intake & PII-Masking Agent
* **Inputs:** Image (`JPG/PNG`), `PDF`, and/or audio (`MP3/WAV/OGG`) + language selection (`en`, `hi`, etc.).
* **Processing:** Extracts raw text via OCR, transcribes voice context, and runs deterministic PII redaction (`XXXX-XXXX-1234`) before storing any session logs.
* **Guardrail:** If OCR text length < 50 characters or blur score is high, immediately prompts the user to retake a clearer photo rather than guessing.

### Agent 2: Legal Triage & Deadline Agent
* **Inputs:** Cleaned document text + user voice/text context.
* **Processing:** Produces a strict JSON object containing `document_type`, `parties`, `forum_or_sender`, `statutory_sections`, `monetary_amount`, `urgent_deadlines`, and `evidence_snippets`.
* **Guardrail:** Every extracted claim must include a verbatim `source_quote` from the OCR text. Missing dates are returned as `null` with `deadline_warning: "Verify on physical copy"`.

### Agent 3: NALSA & Lok Adalat Routing Agent
* **Inputs:** Extracted JSON + user's 4-question legal aid profile (`annual_income_band`, `category_flags`, `dispute_nature`).
* **Processing:**
  * Evaluates **Free Legal Aid** eligibility under Section 12 of the Legal Services Authorities Act, 1987.
  * Evaluates **Lok Adalat / Pre-Litigation Mediation** fit (e.g., NI Act Section 138 cheque bounce, traffic challans, electricity/water bills, consumer disputes, bank recovery, compoundable offences).
* **Output:** `legal_aid_eligible` (`true/false/check_local_dlsa`), `lok_adalat_fit` (`high/medium/low`), and `recommended_next_forum`.

### Agent 4: Dual-Output Synthesis Agent
* **Citizen Output:** Short, empathetic, jargon-free explanation in the user's selected language with 3 concrete next actions and a mandatory non-advice disclaimer.
* **Paralegal Output:** Structured 1-page markdown/PDF-ready brief containing case chronology, extracted entities, missing-documents checklist (e.g., ID proof, income certificate for DLSA, original cheque/dishonour memo), and routing rationale.

---

## 3. Recommended Tech Stack (Hackathon-Ready)

* **Orchestration:** AgentFoundry (AF) multi-agent workflow
* **Frontend:** Next.js / React (mobile-first, 360px responsive, Tailwind CSS)
* **Backend / API:** FastAPI (Python) or Node.js API routes
* **OCR & Speech:** Multimodal vision-language model / Tesseract + Indic ASR (e.g., Whisper / Bhashini-compatible endpoint)
* **Telemetry DB:** Lightweight SQLite / Supabase / PostgreSQL table storing **only anonymized pilot metrics** (no raw legal documents).
