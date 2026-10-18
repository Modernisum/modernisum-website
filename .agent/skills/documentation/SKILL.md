---
name: documentation
description: >-
  Authoritative standards for drafting statutory legal documents (Indian Contract Act 1872, IT Act 2000 Section 10A,
  DPDP Act 2023, MSME statutory rules), commercial terms, transparent payment & SLA policies, and visual-first
  user/developer tutorials across MOD School and Modernisum Parent Studio.
---

# Documentation & Legal Drafting Standard

> **The Sovereign Legal & Educational Axiom**:  
> In accordance with Indian jurisprudence and our *"Atithi Devo Bhava"* philosophy, all contracts, policies, SLAs, and tutorials must be unambiguous, legally enforceable, and completely transparent.  
> Users, school directors, and enterprise clients must never encounter hidden clauses, predatory monetization, or confusing developer jargon.

---

## 1. Statutory Legal Drafting Blueprint (कानूनी दस्तावेज़)

Every master agreement, terms of service, and software licensing contract for **Modernisum Technologies** (`UDYAM-UP-56-0049848`) and **MOD School** (`school.modernisum.com`) must conform to the following statutory frameworks:

### 1.1 Indian Contract Act, 1872
- **Five Mandatory Enforceability Elements**:
  1. **Unconditional Offer & Acceptance**: Clear definition of software license scope or enterprise milestones.
  2. **Lawful Consideration**: Precise financial breakdown with 0% hidden platform fees.
  3. **Capacity of Parties**: Registered institution/enterprise acting via authorized signatories.
  4. **Free Consent**: Zero forced opt-ins, dark patterns, or coercive countdown timers.
  5. **Lawful Object**: Solely for legitimate educational and enterprise administrative operations.

### 1.2 Information Technology Act, 2000 (Section 10A)
- **Electronic Contract Enforceability**: Clickwrap, browsewrap, and digital acceptances via web forms are legally binding under Section 10A of the IT Act, 2000.
- **Audit Trails**: Capture client IP, timestamp, user email/ID, and tamper-evident SHA-256 hash upon policy agreement.

### 1.3 Digital Personal Data Protection (DPDP) Act, 2023
- **Data Fiduciary vs. Technical Conduit**:
  - The client institution (School / Enterprise) is strictly the **Data Fiduciary**.
  - Modernisum operates strictly as a **Technical Conduit / Data Processor** via local-first desktop software and ephemeral E2EE relay tunnels.
- **Zero Centralized Student/Institutional Data Storage**:
  - Student records, marks, biometric vector hashes, and fee transactions reside exclusively on the institution's local hardware (e.g. SQLite / LAN stores).
  - Modernisum central servers hold **zero sensitive personal records**.

### 1.4 MSME Development Act, 2006 & Statutory Tax Status
- **Registration**: Modernisum Technologies is an official Government of India registered MSME (`UDYAM-UP-56-0049848`).
- **GST Exemption**: Billed at 0% GST under statutory MSME turnover thresholds, passing 100% tax savings directly to educational institutions.
- **Dispute Resolution**: Governed by the Micro and Small Enterprises Facilitation Council (MSEFC) under the MSMED Act, 2006.

---

## 2. Commercial Terms, SLA Guarantees & Payment Policies

### 2.1 Guaranteed Fixed-Price Rule
- Once a quotation or scope is locked upon client approval, **the price is 100% frozen**.
- Zero scope-creep charges, zero post-facto billing inflation, and zero surprise vendor markups.

### 2.2 Guaranteed SLA Delivery & Liquidated Delay Penalties
- Software engineering milestones and system deployments feature firm calendar-day deadlines.
- If Modernisum breaches a committed SLA delivery deadline due to internal engineering delays, the client is credited an explicit per-day liquidated penalty deduction against the project balance.

### 2.3 100% Advance Refund Guarantee
- If software fails to meet agreed technical specifications or delivery is abandoned, 100% of the advance deposit is immediately refunded without dispute.

### 2.4 Transparent Subscription Billing Architecture
- **MOD School OS**:
  - Base Student Licensing: ₹20 / student / month (Quarterly Prepaid) or ₹15 / student / month (Annual Upfront, 25% discount).
  - Faculty & Staff: Transparent per-seat scaling.
  - Parents & Students: ₹0 fee — mobile applications are provided completely free of charge.
- **Zero Speculative Marketing ROI**:
  - Prohibited in all copy: Claims of "₹X Lakhs guaranteed admission profit" or speculative revenue surges.
  - Value proposition is strictly focused on **Workload Elimination** and **Elevated Campus Governance**.

---

## 3. Technical Documentation & Tutorial Architecture

When drafting user manuals, integration guides, or administration tutorials:

### 3.1 The 70–90% Visual Communication Law
- Decision-makers and educators scan visually. Replace paragraphs with:
  - **Annotated Screenshots**: High-resolution interface captures with callout arrows.
  - **Animated Hardware Diagrams**: Turnstile barrier motion, ESC/POS receipt thermal cutting, GPS vehicle tracking.
  - **Step Cards**: Numbered, frosted-glass process steps (`1. Install`, `2. Connect LAN`, `3. Authorize`).
  - **Pill Badges**: Quick metric indicators (`<150ms Match`, `Offline-Ready`, `Zero Cloud`).

### 3.2 Standard Tutorial Structure
1. **Objective & Outcome**: 1–2 punchy sentences describing what the guide achieves.
2. **Prerequisites**: Clear hardware, OS, and permission requirements in a bullet list.
3. **Step-by-Step Walkthrough**: Numbered cards with UI screenshots and exact button labels.
4. **Configuration & Code**: Copy-pasteable snippets with language tags.
5. **Troubleshooting Matrix**: 2-column table mapping common errors to immediate solutions.

---

## 4. Policy Storage & Real-Time Dynamic PDF Generation

### 4.1 Dual Synchronization (Firestore + Local JSON Mirror)
- **Local JSON Offline Mirror (`lib/data/policies.json`)**:
  - Contains all structured active policies: `terms`, `subscription`, `privacy`, `dpdp`, `licensing`, `software-development`.
  - Serves as the agent's offline single source of truth during development, builds, and sandbox executions.
- **Firestore Synchronization**:
  - Master seed defined in `lib/firestore/policies.ts` (`DEFAULT_POLICIES_SEED`).
  - Dynamic updates through `/admin/policies` immediately write to Firestore and must be mirrored to `lib/data/policies.json`.

### 4.2 Dynamic Vector PDF Engine (Zero Static PDF Uploads)
- Policies are never uploaded manually.
- Vector PDFs are generated on the fly from active policy state using `components/policy/PolicyPdfDocument.tsx` and the dedicated print route `/policies/[slug]/print`.

---

## 5. Dual-Domain Applicability

| Dimension | MOD School (`school.modernisum.com`) | Modernisum Parent Studio (`modernisum.com`) |
| :--- | :--- | :--- |
| **Primary Audience** | School Owners, Principals, Bursars, Teachers, Parents | Enterprise Founders, CTOs, R&D Leaders |
| **Legal Focus** | Student DPDP Act compliance, local-first campus LAN, ₹0 parent fee | Fixed-price milestone contracts, IP escrow, SLA penalty |
| **Tutorial Focus** | Biometric turnstile, fee receipts, report cards, WhatsApp alerts | Custom AI deployment, API integration, cloud/local hybrid |
| **Tone** | Respectful, empathetic, educational, reassuring ("Atithi Devo Bhava") | Precise, architectural, executive, performance-focused |
