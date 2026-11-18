# Product Requirements Document (PRD) — न्यायSetu

**Version:** 1.0 (Hackathon MVP)  
**Track:** 07 · Timely Justice — Legal Backlog  
**Target Platform:** AgentFoundry (AF) Web App + Mobile-Responsive Intake

---

## 1. Problem Statement & Opportunity

Over **5.61 crore cases** are pending across Indian courts as of July 2026, with **4.97 crore** concentrated in district courts ([Judicio / NJDG 2026](https://judicio.ai/blogs/indian-judiciary-pendency-statistics)). A major share of district-court friction comes from pre-litigation and early-stage bottlenecks: citizens receive English or dense legal notices they cannot understand, miss statutory reply windows, arrive at legal aid clinics without required documents, or enter regular civil/criminal queues for disputes eligible for **Lok Adalat** or **mediation**.

**न्यायSetu** solves the *first-mile triage gap* by converting messy paper notices and vernacular voice descriptions into structured, actionable legal-aid and settlement packets in under 3 minutes.

---

## 2. Target Personas

1. **Primary User — Citizen / Small-Business Litigant ("Ramesh"):** Speaks Hindi or a regional language, holds a smartphone, has received a legal notice, eviction letter, cheque-bounce notice, or consumer/traffic summons, and does not know what it means or whether they can afford a lawyer.
2. **Secondary User — Paralegal / Law-Clinic Volunteer ("Ananya"):** Works at a District Legal Services Authority (DLSA) helpdesk or law college Legal Aid Clinic; spends 30–45 minutes per walk-in manually reading papers, interviewing the citizen, and checking document completeness.
3. **Downstream Consumer — Duty Advocate / Mediator:** Needs a crisp 1-page chronological brief and missing-document checklist rather than a 20-page stack of unorganized photos.

---

## 3. Core Functional Requirements (MVP)

| ID | Requirement | Description | Priority |
| --- | --- | --- | --- |
| **FR-1** | **Multimodal Intake** | Accept image/PDF upload (legal notice, FIR, summons, agreement) + optional voice/text note in English or Hindi (extensible to other Indic languages). | P0 |
| **FR-2** | **Structured Legal Extraction** | Extract document type, sender/respondent, court/forum, relevant sections/acts, monetary claim, and next deadline/hearing date. | P0 |
| **FR-3** | **Vernacular Citizen Summary** | Generate a jargon-free summary in the user's chosen language answering: *What is this? What is the risk? What is my exact deadline? What should I do next?* | P0 |
| **FR-4** | **Free Legal Aid Eligibility Check** | Interactive 4-question check against Section 12 of the Legal Services Authorities Act, 1987 (income, gender, age, category) to flag NALSA/DLSA eligibility. | P0 |
| **FR-5** | **Lok Adalat / Mediation Router** | Classify whether the dispute is eligible for Lok Adalat / pre-litigation mediation (e.g., NI Act s.138, traffic challan, utility, consumer, rent) and explain the fast-track option. | P0 |
| **FR-6** | **1-Page Paralegal Case Brief** | Exportable/printable structured brief with timeline, extracted facts, and a tailored missing-documents checklist. | P1 |
| **FR-7** | **Pilot Telemetry Logger** | Anonymized logging of triage duration, document category, routing outcome, and before/after user comprehension rating for [JUDGING.md](https://github.com/karlmehta/code-for-a-billion/blob/main/JUDGING.md) Criterion 4 proof. | P0 |

---

## 4. Non-Functional Requirements

* **Latency:** End-to-end intake-to-brief generation in **≤ 30 seconds** for a 1–3 page document.
* **Accuracy & Grounding:** Every extracted date, section, and party name must cite the exact snippet/line from the uploaded document; low-confidence fields must be flagged for human review.
* **Privacy:** No Aadhaar, PAN, or bank account numbers stored in analytics logs; documents processed in-session or purged after anonymized metric capture.
* **Accessibility:** Mobile-first UI (360px viewport), large tap targets, high contrast, and optional audio playback / WhatsApp-shareable text summary.

---

## 5. Out of Scope (Hackathon MVP)

* Direct e-Filing integration with e-Courts APIs (no official public write-API access during hackathon).
* Automated legal representation or predictive win/loss case outcome percentages.
* Paid lawyer marketplace or escrow payments.
