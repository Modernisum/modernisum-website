"use client";

import React from "react";
import { FirestorePolicyDoc, PolicySectionItem } from "@/lib/firestore/policies";
import { Check, ShieldCheck, Lock, Award, FileText, CheckCircle2 } from "lucide-react";

interface PolicyPdfDocumentProps {
  policy: FirestorePolicyDoc;
  customSignatory?: {
    institutionName?: string;
    signatoryName?: string;
    referenceId?: string;
    date?: string;
  };
}

export function PolicyPdfDocument({ policy, customSignatory }: PolicyPdfDocumentProps) {
  return (
    <div
      id="policy-pdf-document"
      className="policy-pdf-root bg-white text-slate-900 font-sans mx-auto max-w-[850px] p-8 sm:p-12 shadow-2xl rounded-sm border border-slate-200 print:shadow-none print:border-none print:p-0 print:max-w-none print:m-0"
      style={{ minHeight: "1100px" }}
    >
      {/* ======================================================== */}
      {/* 1. DOCUMENT HEADER & OFFICIAL GOVERNMENT MSME BADGES     */}
      {/* ======================================================== */}
      <header className="border-b-2 border-slate-300 pb-4 mb-5 avoid-break">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          {/* Left Title Block with Blue Accent */}
          <div className="border-l-4 border-sky-600 pl-3.5 flex-1">
            <div className="text-[10px] sm:text-[11px] font-bold font-mono tracking-widest text-sky-800 uppercase">
              MODERNISUM TECHNOLOGIES (GOVT. OF INDIA MSME: UDYAM-UP-56-0049848)
            </div>
            <h1 className="text-xl sm:text-2xl font-black font-serif tracking-tight text-slate-950 uppercase mt-1 leading-tight">
              {policy.title}
            </h1>
            <p className="text-[10px] sm:text-[10.5px] text-slate-600 font-medium leading-relaxed mt-1">
              Platform: &ldquo;School&rdquo; ERP (school.modernisum.com) | Parent Entity: Modernisum (modernisum.com) | Founder &amp; Architect: Mr. Shivank Kumar | Regd. Office: Near Water Tank, Vill. Dayalpur, Parikshitgarh, Meerut, UP – 250406
            </p>
          </div>

          {/* Right Official Vector Seals */}
          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-start">
            {/* Seal 1: Govt of India MSME Gold Seal */}
            <div className="w-16 h-16 rounded-full border-2 border-amber-500/80 bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 flex flex-col items-center justify-center p-1 text-center shadow-xs">
              <Award className="w-5 h-5 text-amber-700 mb-0.5" />
              <span className="text-[6.5px] font-black font-mono uppercase text-amber-900 leading-tight">
                GOVT. OF INDIA
              </span>
              <span className="text-[5.5px] font-bold font-mono text-amber-800 leading-none">
                MSME REGISTERED
              </span>
              <span className="text-[5px] font-mono text-amber-950 scale-90">
                UDYAM-UP-56
              </span>
            </div>

            {/* Seal 2: Modernisum Sovereign Security Seal */}
            <div className="w-16 h-16 rounded-full border-2 border-sky-600/80 bg-gradient-to-br from-sky-50 via-cyan-100 to-blue-200 flex flex-col items-center justify-center p-1 text-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-sky-800 mb-0.5" />
              <span className="text-[6.5px] font-black font-mono uppercase text-sky-950 leading-tight">
                MODERNISUM
              </span>
              <span className="text-[5.5px] font-bold font-mono text-sky-800 leading-none">
                VERIFIED CORE
              </span>
              <span className="text-[5px] font-mono text-sky-900 scale-90">
                SEC. 10A IT ACT
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. STATUTORY PREAMBLE & ELECTRONIC BINDING MANDATE BOX   */}
      {/* ======================================================== */}
      {policy.preamble && (
        <section className="p-3.5 mb-5 rounded-lg bg-slate-50 border-l-4 border-sky-600 border border-slate-200 avoid-break">
          <h2 className="text-[10.5px] font-bold font-mono uppercase tracking-wider text-sky-900 mb-1">
            {policy.preamble.title || "STATUTORY PREAMBLE & ELECTRONIC BINDING NOTICE:"}
          </h2>
          <p className="text-[10.5px] text-slate-800 font-normal leading-relaxed text-justify">
            {policy.preamble.text}
          </p>
        </section>
      )}

      {/* ======================================================== */}
      {/* 3. STRUCTURED CLAUSES & SECTIONS                         */}
      {/* ======================================================== */}
      <div className="space-y-5">
        {policy.sections.map((sec, idx) => (
          <article
            key={sec.id || idx}
            className="avoid-break pt-1 text-[11px] text-slate-800 space-y-2 leading-relaxed"
          >
            {/* Section Header */}
            <div className="border-b border-slate-200 pb-1 flex items-baseline justify-between gap-2">
              <h3 className="text-xs sm:text-[12.5px] font-bold uppercase tracking-wide text-sky-900 font-serif">
                {sec.number ? `${sec.number}. ` : `${idx + 1}. `}
                {sec.title}
              </h3>
              {sec.tag && (
                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-300">
                  {sec.tag}
                </span>
              )}
            </div>

            {/* Paragraph Contents */}
            {sec.content && sec.content.length > 0 && (
              <div className="space-y-1.5 text-justify">
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-800">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Highlights Flow Cards / Architecture Diagram */}
            {sec.highlights && sec.highlights.length > 0 && (
              <div className="my-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {sec.highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-bold text-sky-900 mb-1">
                          <span>{h.title}</span>
                          {h.badge && (
                            <span className="text-[8px] font-mono bg-sky-100 text-sky-800 px-1 rounded">
                              {h.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[9.5px] text-slate-600 leading-snug">
                          {h.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-[9px] font-mono text-slate-500 text-center mt-2">
                  Figure {sec.number || idx + 1}.1: Architecture Flow — Client local custody with zero cloud hoarding.
                </div>
              </div>
            )}

            {/* Structured Table */}
            {sec.table && sec.table.headers && (
              <div className="my-2.5 overflow-hidden rounded-lg border border-slate-300">
                <table className="w-full text-left border-collapse text-[10px]">
                  <thead>
                    <tr className="bg-[#0f2b5c] text-white">
                      {sec.table.headers.map((th, thIdx) => (
                        <th
                          key={thIdx}
                          className="p-2 font-bold uppercase tracking-wider border-r border-slate-600 last:border-r-0"
                        >
                          {th}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sec.table.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="p-2 border-t border-slate-200 border-r border-slate-200 last:border-r-0 font-medium"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Alert / Critical Guarantee Box */}
            {sec.alert && (
              <div className="my-2 p-3 rounded-lg bg-amber-50/80 border-l-4 border-amber-500 border border-amber-200 space-y-1">
                <div className="text-[10px] font-bold uppercase text-amber-900">
                  {sec.alert.title}
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-[9.5px] text-amber-950">
                  {sec.alert.items.map((item, iIdx) => (
                    <li key={iIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Code Snippet / Click-wrap Script Box */}
            {sec.codeSnippet && (
              <div className="my-2 p-2.5 rounded-lg bg-[#0f172a] text-[#38bdf8] font-mono text-[9px] leading-relaxed overflow-x-auto border border-slate-700">
                <pre className="whitespace-pre-wrap">{sec.codeSnippet}</pre>
              </div>
            )}

            {/* Bullet Points */}
            {sec.bullets && sec.bullets.length > 0 && (
              <ul className="space-y-1 pl-4 list-disc text-slate-800">
                {sec.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            )}

            {/* Signoff Block if embedded in section */}
            {sec.signoffBlock && (
              <div className="mt-4 p-3 rounded-lg border border-slate-300 bg-slate-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Licensor */}
                  <div className="space-y-1 border-r border-slate-300 pr-3">
                    <h4 className="text-[10.5px] font-bold uppercase text-sky-950 border-b border-slate-200 pb-1">
                      FOR LICENSOR (TECHNOLOGY PROVIDER):
                    </h4>
                    <div className="text-[10px] space-y-0.5 text-slate-700">
                      <p><strong>Entity:</strong> {sec.signoffBlock.licensor.entity}</p>
                      <p><strong>MSME Reg. No.:</strong> {sec.signoffBlock.licensor.msme}</p>
                      <p><strong>Authorized By:</strong> {sec.signoffBlock.licensor.authorizedBy}</p>
                      <p><strong>Address:</strong> {sec.signoffBlock.licensor.address}</p>
                      <p><strong>Contact:</strong> {sec.signoffBlock.licensor.webMail}</p>
                    </div>
                  </div>

                  {/* Licensee */}
                  <div className="space-y-1 pl-1">
                    <h4 className="text-[10.5px] font-bold uppercase text-sky-950 border-b border-slate-200 pb-1">
                      FOR LICENSEE (CLIENT / INSTITUTION):
                    </h4>
                    <div className="text-[10px] space-y-1.5 text-slate-700 pt-0.5">
                      <p>
                        <strong>{sec.signoffBlock.licensee.institutionPrompt}:</strong>{" "}
                        {customSignatory?.institutionName || "____________________________________"}
                      </p>
                      <p>
                        <strong>{sec.signoffBlock.licensee.signatoryPrompt}:</strong>{" "}
                        {customSignatory?.signatoryName || "____________________________________"}
                      </p>
                      <p>
                        <strong>{sec.signoffBlock.licensee.schoolIdPrompt}:</strong>{" "}
                        {customSignatory?.referenceId || "____________________________________"}
                      </p>
                      <p className="text-[9px] text-slate-500 pt-1">
                        Acceptance Mode: {sec.signoffBlock.licensee.acceptanceMode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* ======================================================== */}
      {/* 4. DEFAULT STATUTORY EXECUTION & SIGN-OFF BLOCK          */}
      {/* ======================================================== */}
      <section className="mt-8 pt-4 border-t-2 border-slate-300 avoid-break">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 font-serif">
          OFFICIAL STATUTORY EXECUTION &amp; LEGAL SIGN-OFF BLOCK
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-slate-300 bg-slate-50/80">
          {/* Licensor Side */}
          <div className="space-y-1.5 border-b sm:border-b-0 sm:border-r border-slate-300 pb-3 sm:pb-0 sm:pr-4">
            <span className="text-[10.5px] font-bold uppercase tracking-wide text-sky-900 block border-b border-slate-200 pb-1">
              FOR LICENSOR (TECHNOLOGY PROVIDER):
            </span>
            <div className="text-[10px] space-y-0.5 text-slate-700">
              <p><strong>Entity:</strong> Modernisum Technologies</p>
              <p><strong>Govt. of India MSME:</strong> UDYAM-UP-56-0049848</p>
              <p><strong>Authorized By:</strong> Mr. Shivank Kumar (Founder &amp; Lead Architect)</p>
              <p><strong>Registered Office:</strong> Near Water Tank, Vill. Dayalpur, Parikshitgarh, Meerut, Uttar Pradesh – 250406</p>
              <p><strong>Official Web &amp; Mail:</strong> modernisum.com | contact@modernisum.com</p>
            </div>
            <div className="pt-3">
              <div className="border-t border-slate-400 w-44 pt-0.5 text-[9px] text-slate-600 font-mono">
                Authorized Executive Signature
              </div>
            </div>
          </div>

          {/* Licensee Side */}
          <div className="space-y-1.5 sm:pl-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wide text-sky-900 block border-b border-slate-200 pb-1">
              FOR LICENSEE (CLIENT / ONBOARDING INSTITUTION):
            </span>
            <div className="text-[10px] space-y-2 text-slate-700 pt-0.5">
              <p>
                <strong>Institution Name:</strong>{" "}
                <span className="font-mono text-slate-950">
                  {customSignatory?.institutionName || "_________________________________"}
                </span>
              </p>
              <p>
                <strong>Authorized Signatory:</strong>{" "}
                <span className="font-mono text-slate-950">
                  {customSignatory?.signatoryName || "_________________________________"}
                </span>
              </p>
              <p>
                <strong>Order / License ID:</strong>{" "}
                <span className="font-mono text-slate-950">
                  {customSignatory?.referenceId || "MOD-LIC-VERIFIED"}
                </span>
              </p>
              <p className="text-[9px] text-slate-500">
                Acceptance Mode: Digital Click-Wrap Verification under Section 10A of IT Act, 2000
              </p>
            </div>
            <div className="pt-2">
              <div className="border-t border-slate-400 w-44 pt-0.5 text-[9px] text-slate-600 font-mono">
                Authorized Signatory / Institutional Stamp
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. RUNNING FOOTER                                        */}
      {/* ======================================================== */}
      <footer className="mt-6 pt-3 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-2 text-[9.5px] text-slate-500 font-mono avoid-break">
        <div>
          Modernisum Technologies (MSME: UDYAM-UP-56-0049848) | Dayalpur, Parikshitgarh, Meerut, UP – 250406
        </div>
        <div>
          Official Executed Electronic Agreement | {policy.effectiveDate}
        </div>
      </footer>
    </div>
  );
}
