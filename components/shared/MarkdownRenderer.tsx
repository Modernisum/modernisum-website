import React from "react";
import Link from "next/link";
import { Quote, Sparkles, CheckCircle2 } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

/**
 * Parses inline markdown: **bold**, *italic*, `code`, [link](url)
 */
function renderInline(text: string): React.ReactNode {
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    if (!part) return null;

    // Inline Code
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-200/80 dark:bg-white/10 font-mono text-xs sm:text-sm text-cyan-800 dark:text-cyan-300 border border-slate-300/60 dark:border-white/10 font-semibold"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={index}
          className="font-bold text-slate-900 dark:text-white"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em
          key={index}
          className="italic text-cyan-800 dark:text-cyan-200"
        >
          {part.slice(1, -1)}
        </em>
      );
    }

    // Link [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      return (
        <Link
          key={index}
          href={href}
          className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 underline underline-offset-4 font-medium transition-colors"
        >
          {label}
        </Link>
      );
    }

    return part;
  });
}

type BlockType =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "hr" }
  | { type: "paragraph"; text: string };

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const normalized = content.replace(/\r\n/g, "\n").trim();
  const rawLines = normalized.split("\n");

  const blocks: BlockType[] = [];
  let currentParagraph: string[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;
  let currentBlockquote: string[] = [];
  let currentTable: string[][] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      blocks.push({
        type: "paragraph",
        text: currentParagraph.join(" ").trim(),
      });
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList && currentList.items.length > 0) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  const flushBlockquote = () => {
    if (currentBlockquote.length > 0) {
      blocks.push({
        type: "blockquote",
        text: currentBlockquote.join(" ").trim(),
      });
      currentBlockquote = [];
    }
  };

  const flushTable = () => {
    if (currentTable.length > 0) {
      if (currentTable.length >= 2) {
        const isSeparator = currentTable[1].every((cell) => /^[-:\s]+$/.test(cell));
        if (isSeparator) {
          const headers = currentTable[0];
          const rows = currentTable.slice(2);
          blocks.push({ type: "table", headers, rows });
        } else {
          blocks.push({ type: "table", headers: currentTable[0], rows: currentTable.slice(1) });
        }
      } else {
        blocks.push({ type: "table", headers: currentTable[0], rows: [] });
      }
      currentTable = [];
    }
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
    flushBlockquote();
    flushTable();
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    if (!line) {
      flushAll();
      continue;
    }

    if (line.startsWith("# ")) {
      flushAll();
      blocks.push({ type: "h1", text: line.replace("# ", "").trim() });
      continue;
    }

    if (line.startsWith("## ")) {
      flushAll();
      blocks.push({ type: "h2", text: line.replace("## ", "").trim() });
      continue;
    }

    if (line.startsWith("### ")) {
      flushAll();
      blocks.push({ type: "h3", text: line.replace("### ", "").trim() });
      continue;
    }

    if (line.startsWith("#### ")) {
      flushAll();
      blocks.push({ type: "h4", text: line.replace("#### ", "").trim() });
      continue;
    }

    if (line.startsWith(">")) {
      flushParagraph();
      flushList();
      const quoteText = line.replace(/^>\s*/, "");
      currentBlockquote.push(quoteText);
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph();
      flushBlockquote();
      const itemText = line.slice(2).trim();
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    const olMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      flushParagraph();
      flushBlockquote();
      const itemText = olMatch[2].trim();
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    if (line === "---" || line === "***" || line === "___") {
      flushAll();
      blocks.push({ type: "hr" });
      continue;
    }

    if (line.startsWith("|") && line.endsWith("|")) {
      flushParagraph();
      flushList();
      flushBlockquote();
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      currentTable.push(cells);
      continue;
    }

    if (currentTable.length > 0) {
      flushTable();
    }

    if (currentBlockquote.length > 0) {
      currentBlockquote.push(line);
      continue;
    }

    currentParagraph.push(line);
  }

  flushAll();

  return (
    <div className="space-y-6 text-slate-700 dark:text-slate-200">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h1":
            return (
              <h2
                key={idx}
                className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-200/80 dark:border-white/10 tracking-tight leading-snug"
              >
                <span>{renderInline(block.text)}</span>
              </h2>
            );

          case "h2":
            const headingId = block.text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            return (
              <h2
                key={idx}
                id={headingId}
                className="scroll-mt-28 text-lg sm:text-xl lg:text-2xl font-bold font-display text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-200/60 dark:border-white/10 tracking-tight leading-snug"
              >
                {renderInline(block.text)}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={idx}
                className="text-base sm:text-lg font-bold font-display text-cyan-800 dark:text-cyan-300 pt-4 pb-1 tracking-tight flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                <span>{renderInline(block.text)}</span>
              </h3>
            );

          case "h4":
            return (
              <h4
                key={idx}
                className="text-sm sm:text-base font-bold font-display text-slate-800 dark:text-slate-200 pt-3"
              >
                {renderInline(block.text)}
              </h4>
            );

          case "blockquote":
            return (
              <div
                key={idx}
                className="my-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-purple-500/10 dark:from-cyan-950/40 dark:to-purple-950/20 border-l-4 border-cyan-500 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <Quote className="w-6 h-6 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5 opacity-80" />
                  <blockquote className="text-sm sm:text-base italic font-medium text-slate-800 dark:text-cyan-100 leading-relaxed">
                    {renderInline(block.text)}
                  </blockquote>
                </div>
              </div>
            );

          case "ul":
            return (
              <ul key={idx} className="space-y-3 my-4 pl-1">
                {block.items.map((item, iIdx) => (
                  <li
                    key={iIdx}
                    className="flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-1" />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={idx} className="space-y-3 my-4 pl-1">
                {block.items.map((item, iIdx) => (
                  <li
                    key={iIdx}
                    className="flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/30">
                      {iIdx + 1}
                    </span>
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ol>
            );

          case "hr":
            return (
              <hr
                key={idx}
                className="my-8 border-t border-slate-200/80 dark:border-white/10"
              />
            );

          case "table":
            return (
              <div
                key={idx}
                className="my-8 overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-lg bg-white/60 dark:bg-slate-900/40 backdrop-blur-md"
              >
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/[0.04]">
                      {block.headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="py-3.5 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs whitespace-nowrap"
                        >
                          {renderInline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-white/5">
                    {block.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-cyan-500/[0.03] dark:hover:bg-cyan-500/[0.04] transition-colors"
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="py-3.5 px-4 text-slate-700 dark:text-slate-300 leading-relaxed"
                          >
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "paragraph":
          default:
            return (
              <p
                key={idx}
                className="text-[15px] sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal"
              >
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
