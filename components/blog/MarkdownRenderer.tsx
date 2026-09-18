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
  // Regex pattern matching:
  // 1. `code`
  // 2. **bold**
  // 3. *italic*
  // 4. [text](url)
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
  | { type: "paragraph"; text: string };

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Clean and split lines
  const normalized = content.replace(/\r\n/g, "\n").trim();
  const rawLines = normalized.split("\n");

  const blocks: BlockType[] = [];
  let currentParagraph: string[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;
  let currentBlockquote: string[] = [];

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

  const flushAll = () => {
    flushParagraph();
    flushList();
    flushBlockquote();
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();

    // Blank line terminates active blocks
    if (!line) {
      flushAll();
      continue;
    }

    // Heading 1
    if (line.startsWith("# ")) {
      flushAll();
      blocks.push({ type: "h1", text: line.replace("# ", "").trim() });
      continue;
    }

    // Heading 2
    if (line.startsWith("## ")) {
      flushAll();
      blocks.push({ type: "h2", text: line.replace("## ", "").trim() });
      continue;
    }

    // Heading 3
    if (line.startsWith("### ")) {
      flushAll();
      blocks.push({ type: "h3", text: line.replace("### ", "").trim() });
      continue;
    }

    // Heading 4
    if (line.startsWith("#### ")) {
      flushAll();
      blocks.push({ type: "h4", text: line.replace("#### ", "").trim() });
      continue;
    }

    // Blockquote (> ...)
    if (line.startsWith(">")) {
      flushParagraph();
      flushList();
      const quoteText = line.replace(/^>\s*/, "");
      currentBlockquote.push(quoteText);
      continue;
    }

    // Unordered list item (- ... or * ...)
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

    // Ordered list item (1. ... or 2. ...)
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

    // If we're inside a blockquote and line doesn't start with >, but was immediately below it without blank line
    if (currentBlockquote.length > 0) {
      currentBlockquote.push(line);
      continue;
    }

    // Regular paragraph line
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
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-slate-900 dark:text-white pt-8 pb-3 border-b border-slate-200/80 dark:border-white/10 tracking-tight leading-tight flex items-center gap-3"
              >
                <Sparkles className="w-6 h-6 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>{renderInline(block.text)}</span>
              </h2>
            );

          case "h2":
            return (
              <h2
                key={idx}
                className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-200/60 dark:border-white/10 tracking-tight leading-snug"
              >
                {renderInline(block.text)}
              </h2>
            );

          case "h3":
            return (
              <div key={idx} className="pt-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 mb-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span>Architecture Feature</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white tracking-tight leading-snug">
                  {renderInline(block.text)}
                </h3>
              </div>
            );

          case "h4":
            return (
              <h4
                key={idx}
                className="text-lg sm:text-xl font-bold font-display text-cyan-800 dark:text-cyan-300 pt-3"
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

          case "paragraph":
          default:
            return (
              <p
                key={idx}
                className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-normal"
              >
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
