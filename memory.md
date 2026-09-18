# Memory & Master Requirements: Modernisum Fullstack Liquid Glass Platform

This document serves as the persistent architectural brain and memory bank for the **Modernisum** platform development.

---

## 1. Company Vision & Core Purpose
- **Company**: Modernisum — Pure AI-Integrated Software, SaaS Platforms, and Modern IT Solutions.
- **CRITICAL INVARIANT**: Modernisum **does NOT provide raw GPU hardware or server clusters**. Modernisum provides **SOFTWARE ONLY** (AI-powered SaaS software, web/mobile applications, custom device software, cloud software, and digital automation).
- **Flagship Ecosystem**: Modern School ERP (Desktop Admin Software, Teacher/Student/Parent Mobile Apps, GPS & RFID attendance software, AI Learning tools).
- **Core Mission**: Top-notch, award-winning web presence combining bleeding-edge Apple-grade Liquid Glass UI/UX with high-performance software architecture.

---

## 2. Fundamental Architecture Decisions
1. **Decoupled Monolith with Hybrid Rendering**:
   - Single Next.js 15+ App Router deployment.
   - Zero additional servers required (Website + Admin Panel + Backend API all in one codebase).
   - `app/(public)`: SSG + ISR with Edge caching (TTFB < 50ms).
   - `app/(admin)`: Isolated CSR (`"use client"`) — 0 bytes leaked to public bundle.
   - `app/api/*`: Serverless route handlers with in-memory caching.
2. **Database & Storage**:
   - **Database**: MongoDB (via `MONGODB_URI`), with singleton connection pooling and zero-downtime resilient seed fallback cache.
   - **File & Media Storage**: Google Drive 5TB cloud storage integrated via Service Account (`d:\modernisum\vidhyam\service-account.json`, Project: `modernschool-d2054`). All uploaded media (images, docs, avatars) stream to Google Drive with public access links.
3. **AI Integration**:
   - **Google Gemini API** (`@google/genai`): Gemini 2.5 Flash for content generation, Gemini Vision for smart image tagging & alt-text, natural language command parser.
4. **Design System & Visual Language**:
   - Apple-inspired Liquid Glass (deep frosted blur `backdrop-blur-xl`, specular borders, chromatic rim highlights, ambient mesh gradients).
   - Initial screen designs designed and validated via **StitchMCP** before code implementation.
5. **Testing & Quality Assurance**:
   - **Playwright** for E2E testing, responsive regression testing, and visual validation.
6. **State & Documentation Tracking**:
   - `memory.md`: Persistent requirements & architectural memory.
   - `status.md`: Live real-time execution status tracking.
   - `tasks.md`: Comprehensive 50–100 granular task matrix organized in phases.
