# न्यायSetu — Voice-First Vernacular Legal Triage & Lok Adalat Router

> **Code for India Hackathon 2026 (Code for a Billion) — Track 07: Timely Justice (Legal Backlog)**  
> Built with **AgentFoundry (AF)** | Public Good · Pre-Litigation Settlement · Free Legal Aid Access

**Demo Link:**  
---

## 1. The Problem: Size & Severity

India's justice system faces a massive, measurable bottleneck:
* **5.61+ crore pending cases** across all court levels as of July 2026—including **4.97 crore in district courts**, **64.5 lakh in High Courts**, and **95,000+ in the Supreme Court** ([Judicio / NJDG 2026 Snapshot](https://judicio.ai/blogs/indian-judiciary-pendency-statistics); [National Judicial Data Grid](https://njdg.ecourts.gov.in/)).
* **1 in 10 district-court cases** is over a decade old, and India operates with roughly **22 sanctioned judges per million people** against the Law Commission's 50-per-million benchmark ([Judicio / NJDG](https://judicio.ai/blogs/indian-judiciary-pendency-statistics)).
* **Why citizens suffer:** Ordinary citizens and small businesses lose years and lakhs of rupees because they cannot parse English/legalese notices, miss statutory deadlines, file in the wrong forum, or do not know they qualify for **free NALSA/DLSA legal aid** or fast-track **Lok Adalat** settlement.

---

## 2. The Solution: What न्यायSetu Does

**न्यायSetu** is a multi-agent legal triage and pre-litigation routing platform built in **AgentFoundry (AF)**. A citizen, paralegal, or law-clinic volunteer uploads a photo/PDF of a legal notice, FIR, summons, or dispute document—along with a short vernacular voice or text note—and receives two structured outputs in under 3 minutes:

1. **Citizen Plain-Language Brief (Vernacular):** Explains what the document means, who the parties are, the exact statutory deadline, and whether the dispute can be settled faster outside regular courts.
2. **Paralegal & Duty-Lawyer Action Packet:** A 1-page chronological case summary, extracted legal sections, a missing-documents checklist, **Section 12 free legal-aid eligibility check**, and a **Lok Adalat / mediation readiness score**.

*Disclaimer: न्यायSetu provides legal information, triage, and procedural preparation—not formal legal representation.*

---

## 3. Architecture Overview

न्यायSetu orchestrates four specialized agents inside AgentFoundry (see [`system_architecture.md`](./system_architecture.md) for full details):
1. **Vernacular Intake & PII-Masking Agent:** OCRs scanned notices/summons, transcribes voice notes (Hindi, English, and regional languages), and redacts sensitive identifiers before downstream reasoning.
2. **Legal Triage & Deadline Agent:** Extracts parties, forum/jurisdiction, applicable statutes, and urgent limitation/hearing dates.
3. **NALSA & Lok Adalat Eligibility Agent:** Evaluates free legal-aid eligibility and compoundable/pre-litigation settlement suitability.
4. **Dual-Output Generator Agent:** Produces the citizen-facing vernacular summary and the 1-page paralegal/lawyer brief.

---

## 4. Proven Impact (Field Pilot Metrics)

*(Update this table with your 48-hour field pilot data before filing your submission issue, per [JUDGING.md](https://github.com/karlmehta/code-for-a-billion/blob/main/JUDGING.md).)*

| Metric | Baseline (Manual) | With न्यायSetu | Field Pilot Result |
| --- | --- | --- | --- |
| **Citizens / Cases Triaged** | — | Target: 25–40 real cases | `TBD (log pilot count)` |
| **Average Triage Time per Case** | ~45 minutes | < 3 minutes | `TBD (log avg minutes)` |
| **Citizen Comprehension Score (1–5)** | `TBD (pre-test)` | `TBD (post-test)` | `TBD (% improvement)` |
| **Cases Routed to Lok Adalat / Free Legal Aid** | — | Target: ≥ 30% eligible | `TBD (% routed)` |

---

## 5. Quickstart & Repository Map

### Documentation
* [`project_context.md`](./project_context.md) — Domain facts, judging rules, and AgentFoundry workspace context
* [`PRD.md`](./PRD.md) — Product requirements, personas, user stories, and scope guardrails
* [`system_architecture.md`](./system_architecture.md) — Multi-agent pipeline, data flow, and privacy design
* [`TMD.md`](./TMD.md) — Technical milestone & design specs, JSON schemas, and test plan
* [`RMD.md`](./RMD.md) — Risk management, hallucination guardrails, and Criterion 4 pilot runbook

### Local Setup (AgentFoundry)
```bash
# 1. Clone the repository
git clone https://github.com/<your-org>/न्यायSetu.git
cd न्यायSetu

# 2. Configure environment variables
cp .env.example .env
# Add your AgentFoundry, OCR/ASR, and LLM API keys

# 3. Install dependencies and start the app
npm install   # or: pip install -r requirements.txt
npm run dev   # or: uvicorn app.main:app --reload
```

---

## 6. Hackathon Eligibility Checklist

- [x] Built using **AgentFoundry (AF)** ([JUDGING.md](https://github.com/karlmehta/code-for-a-billion/blob/main/JUDGING.md))
- [ ] Public GitHub repository with working `README.md`
- [ ] Accessible live demo URL and/or 2–3 minute walkthrough video
- [ ] Field pilot metrics logged and added to Section 4
- [ ] Submission issue filed on `karlmehta/code-for-a-billion` before deadline
