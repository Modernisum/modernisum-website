"use client";

import React, { useState, useRef, useEffect } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  MessageSquare,
  Bot,
  Send,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  User,
  RefreshCw,
  Loader2,
  Video,
  Lock,
  ExternalLink,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  suggestedQuote?: any;
  meetingLink?: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "E-Commerce website 12 din me kitne me banegi?",
  "30% project bana hua hai, complete karne ka estimate?",
  "Google Meet par live consultation link de do",
  "Fixed price aur 100% refund guarantee kya hai?",
];

interface AskAiQuotationBotProps {
  onApplyQuote?: (quote: any) => void;
}

export function AskAiQuotationBot({ onApplyQuote }: AskAiQuotationBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: `Hello! I am **Modernisum's Senior Solutions Architect & Quotation Assistant**. 

You can discuss your requirements directly with me—no pushy sales calls needed! Ask me about:
- **100% Guaranteed Fixed Pricing**: Zero hourly bill uncertainty. What is quoted is final.
- **Dynamic Milestones**: 2-day projects (50/50), 1-week projects (25/50/25), 1-month projects (25/25/25/25).
- **Existing Project Rescue**: We can audit and complete projects already 20% to 50% built.
- **Google Meet Consultation**: Need a face-to-face screen share? Just ask for a meeting link!

What are you looking to build or upgrade? (English / हिंदी / Hinglish)`,
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // If user explicitly asks for Google Meet link
    const lower = text.toLowerCase();
    const isMeetingRequest = lower.includes("meet") || lower.includes("meeting") || lower.includes("consultation") || lower.includes("call");

    try {
      const res = await fetch("/api/ai/quotation-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to get AI response.");
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.reply,
        suggestedQuote: data.suggestedQuote,
        meetingLink: isMeetingRequest ? "https://meet.google.com/new" : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const fallbackMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `Here is our **100% Guaranteed Fixed Price & Zero-Hourly Uncertainty Policy**: You get a locked quote with no surprise runaway bills. You pay **25% advance** to mobilize the dedicated sprint pod, and if Modernisum ever cancels, **100% of your advance is immediately refunded**. You can also use the interactive calculator on the left!`,
        meetingLink: isMeetingRequest ? "https://meet.google.com/new" : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LiquidGlassCard
      glowColor="rgba(0, 242, 254, 0.15)"
      className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 flex flex-col h-[670px] shadow-xl"
    >
      {/* Bot Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Modernisum AI Solutions Architect
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                GEMINI 2.0 FLASH
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Instant guaranteed fixed quotes, milestone roadmap &amp; meeting hub
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[90%] p-4 rounded-2xl space-y-2 leading-relaxed ${
                m.sender === "user"
                  ? "bg-cyan-600 text-white rounded-br-none shadow-md"
                  : "bg-slate-100 dark:bg-white/[0.05] text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 rounded-bl-none shadow-xs"
              }`}
            >
              <div className="whitespace-pre-line font-normal">{m.text}</div>

              {/* Direct Google Meet Link Card */}
              {m.meetingLink && (
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between gap-2 mt-2">
                  <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-[11px]">
                    <Video className="w-4 h-4 text-purple-500" />
                    <span>Instant Google Meet Session</span>
                  </div>
                  <a
                    href={m.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Launch Meet</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Interactive Quote Card if generated */}
              {m.suggestedQuote && (
                <div className="mt-3 p-3.5 rounded-xl bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/15 space-y-2.5">
                  <div className="flex items-center justify-between font-bold text-[11px] text-cyan-700 dark:text-cyan-300">
                    <span>✨ {m.suggestedQuote.solution}</span>
                    <span className="font-mono bg-cyan-500/20 px-2 py-0.5 rounded text-[10px]">
                      {m.suggestedQuote.expeditedDays || m.suggestedQuote.standardDays} Days Net
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div>Fixed Total: ₹{(m.suggestedQuote.finalDiscountedTotal || m.suggestedQuote.totalCost)?.toLocaleString("en-IN")}</div>
                    <div>Advance: ₹{m.suggestedQuote.advanceAmount?.toLocaleString("en-IN")}</div>
                  </div>

                  {m.suggestedQuote.tasks && m.suggestedQuote.tasks.length > 0 && (
                    <div className="pt-1 space-y-1">
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Deliverables Roadmap:</span>
                      {m.suggestedQuote.tasks.slice(0, 3).map((t: any, i: number) => (
                        <div key={i} className="text-[10px] text-slate-700 dark:text-slate-300 flex justify-between">
                          <span className="truncate mr-2">• {t.title}</span>
                          <span className="font-mono text-cyan-600 dark:text-cyan-400 shrink-0">{t.weightPct}%</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {onApplyQuote && (
                    <button
                      type="button"
                      onClick={() => onApplyQuote(m.suggestedQuote)}
                      className="w-full py-1.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer mt-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Sync to Visual Calculator &amp; Slips</span>
                    </button>
                  )}
                </div>
              )}

              <span
                className={`text-[9px] block text-right mt-1 opacity-70 ${
                  m.sender === "user" ? "text-cyan-100" : "text-slate-400"
                }`}
              >
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs p-2">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
            <span>Modernisum AI Architect is analyzing scope and calculating fixed roadmap...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Pills */}
      <div className="py-2 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-cyan-500/10 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-white/10 text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          placeholder="Ask in English or Hindi (e.g. E-Commerce store 12 din me kitne me banegi?)..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
        />
        <GlassButton
          variant="primary"
          size="sm"
          disabled={isLoading || !input.trim()}
          onClick={() => handleSendMessage()}
          className="px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </GlassButton>
      </div>
    </LiquidGlassCard>
  );
}
