# Risk Management & Deployment Document (RMD) — NyaySetu

**Purpose:** Mitigate technical, legal, and field-pilot risks while ensuring maximum score on Criterion 4 (*Proven Impact*) of [JUDGING.md](https://github.com/karlmehta/code-for-a-billion/blob/main/JUDGING.md).

---

## 1. Risk Register & Mitigations

| Risk | Severity | Likelihood | Mitigation |
| --- | --- | --- | --- |
| **LLM Hallucinates Deadlines or Law Sections** | High | Medium | Enforce `source_quotes` grounding in Agent 2; display *"Verify on original document"* whenever OCR confidence < 0.80 or date format is ambiguous. |
| **Unauthorized Legal Advice Liability** | High | Low | Embed a persistent banner + vernacular audio/text disclaimer stating NyaySetu provides procedural triage, not legal counsel; escalate urgent arrest/bail/eviction matters directly to DLSA helplines. |
| **Citizen Privacy / PII Leakage in Pilot** | High | Medium | Mask Aadhaar, PAN, phone, and address strings via Agent 1 before telemetry logging; never upload raw citizen documents to public GitHub repos. |
| **Blurry Mobile Photos / Mixed Vernacular Scripts** | Medium | High | Add client-side image preview + quality check; support voice-note context alongside photo so users can explain what the paper is about even if print is faded. |
| **Weak Criterion 4 (Proven Impact) Proof** | High | Medium | Execute the 25–40 user field pilot by Hour 36 (see Section 2) instead of waiting until the final 2 hours. |

---

## 2. Criterion 4 Field-Pilot Runbook (How to Capture Real Impact Data)

Judges break ties using **Proven impact (25%)** ([JUDGING.md](https://github.com/karlmehta/code-for-a-billion/blob/main/JUDGING.md)). Follow this 4-step protocol during Hours 20–36:

1. **Where to Run the Pilot:**
   * A local law college **Legal Aid Clinic**, a **District Legal Services Authority (DLSA)** helpdesk, or local shopkeepers/residents handling real or anonymized notices (traffic challans, rent agreements, consumer complaints, cheque-bounce notices).
2. **What to Measure (Before & After):**
   * **Pre-Test (30 sec):** Ask the citizen *"Do you know what this document requires you to do and by when?"* (1–5 comprehension scale) and time how long manual reading/triage takes.
   * **Run NyaySetu:** Process the document + voice note and show the vernacular summary + routing result.
   * **Post-Test (30 sec):** Re-score comprehension (1–5), record total NyaySetu triage time, and log whether the case was flagged for **Lok Adalat** or **free DLSA legal aid**.
3. **What to Publish in GitHub:**
   * Publish **aggregated, anonymized summary statistics** (e.g., `N = 34 citizens`, `median triage time: 42m -> 2.4m`, `comprehension: 1.6/5 -> 4.5/5`, `38% flagged for Lok Adalat`).
   * **Never** commit raw photos, names, or phone numbers of pilot participants to the public repository.

---

## 3. Pre-Submission Release Checklist

- [ ] **AgentFoundry (AF) Build Verified:** Repo clearly documents AF agents and workflow.
- [ ] **Live Demo Accessible:** Deployed URL tested on both desktop and mobile (incognito window, no login wall for judges).
- [ ] **2–3 Minute Demo Video:** Shows real photo/voice intake → vernacular brief → 1-page paralegal packet → anonymized pilot dashboard.
- [ ] **Submission Issue Filed:** Opened on `karlmehta/code-for-a-billion` before the deadline with Problem Size ([5.61 Cr cases](https://judicio.ai/blogs/indian-judiciary-pendency-statistics)), Severity, Solution link, and Field Impact data.
