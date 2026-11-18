# Project Context — NyaySetu

This file provides shared domain, hackathon, and engineering context for developers and AI agents working inside **AgentFoundry (AF)** on **NyaySetu**.

---

## 1. Hackathon & Judging Context

* **Event:** Code for India Hackathon 2026 — *Code for a Billion*
* **Selected Track:** Track 07 — **Timely Justice — Legal Backlog** (*Case triage, document summarisation, legal aid access, court scheduling efficiency*)
* **Judging Rubric ([JUDGING.md](https://github.com/karlmehta/code-for-a-billion/blob/main/JUDGING.md)):**
  1. **Size of the problem (25%)** — Quantified citizen reach with credible sources.
  2. **Severity of the problem (25%)** — Concrete human suffering and economic loss.
  3. **Quality of the solution (25%)** — Effective design, reliability, and usability.
  4. **Proven impact (25% — #1 Tie-Breaker)** — Real field deployment data (users reached, outcomes changed, before/after measurements).
* **Mandatory Eligibility:** Built with **AgentFoundry (AF)**, public GitHub repo with working README, accessible demo link/video, and submission issue filed before deadline.

---

## 2. Verified Domain Grounding

* **Case Pendency:** Over **5.61 crore cases** are pending in Indian courts as of July 2026 (~4.97 crore in district courts, ~64.5 lakh in High Courts, ~95,000 in the Supreme Court), with ~1 in 10 district cases pending for over 10 years ([Judicio / NJDG 2026](https://judicio.ai/blogs/indian-judiciary-pendency-statistics); [NJDG](https://njdg.ecourts.gov.in/)).
* **Judicial Capacity:** India has roughly **22 sanctioned judges per million people**, compared to the Law Commission's 50-per-million recommendation ([Judicio / NJDG 2026](https://judicio.ai/blogs/indian-judiciary-pendency-statistics)).
* **Legal Aid & Lok Adalat Context:** Under the Legal Services Authorities Act, 1987 (Section 12), eligible citizens (including women, children, SC/ST members, persons with disabilities, industrial workmen, and low-income individuals within state-prescribed thresholds) qualify for free legal services via **NALSA / SLSA / DLSA**. Compoundable criminal matters, cheque bounce (Section 138 NI Act), traffic challans, consumer, rent, and motor-accident claims can often be routed to **Lok Adalat** or pre-litigation mediation to bypass multi-year court queues.

---

## 3. Product Boundaries & Non-Negotiables

1. **Information & Triage, Not Legal Advice:** Every citizen-facing output must include a clear vernacular disclaimer stating that NyaySetu is an AI triage and preparation aid and does not replace a licensed advocate.
2. **Zero Hallucinated Statutes or Dates:** Never fabricate case numbers, court dates, or statutory sections. If OCR confidence is low or a date is missing, explicitly mark it as `[Unverified — Check Original Document]`.
3. **Privacy-First Intake:** Redact or mask Aadhaar numbers, bank account numbers, and personal phone numbers before logging pilot telemetry.
4. **Built for Low-Literacy & Mobile First:** Citizens interact via a photo + 60-second voice note in vernacular languages; outputs must be scannable on a budget Android smartphone.
