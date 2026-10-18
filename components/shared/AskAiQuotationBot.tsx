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
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  suggestedQuote?: any;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "School ERP 30 din ka project 15 din me kitne ka hoga?",
  "25% advance aur 100% refund policy kya hai?",
  "Delay SLA guarantee kaise kaam karti hai?",
  "Agromi farm telemetry ka estimate kya hai?",
];

interface AskAiQuotationBotProps {
  onApplyQuote?: (quote: any) => void;
}

export function AskAiQuotationBot({ onApplyQuote }: AskAiQuotationBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: `Hello! I am **Modernisum's Autonomous AI Architect & Quotation Assistant**. 

You can discuss your software requirements with me directly—no sales calls needed! Ask me about:
- **Project Turnaround & Pricing**: Our formula (+2% cost for each 1% time expedited).
- **Payment Policies**: 25% Advance Lock, 100% Full Refund Guarantee, and On-Time SLA (-1% per 1% delay).

What are you looking to build? (English / हिंदी / Hinglish)`,
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
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const fallbackMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `I encountered a momentary connectivity issue. However, here is our transparent formula: **For every 1% time saved, cost increases by 2%**. You pay **25% advance** to mobilize the engineering pod, and if we ever cancel, **100% of your advance is immediately refunded**. You can also use the interactive calculator on the left!`,
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
      className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 flex flex-col h-[650px] shadow-xl"
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
                Modernisum AI Architect &amp; Support
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                GEMINI FLASH
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Instant software quotation &amp; transparent policy expert
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
              className={`max-w-[88%] p-4 rounded-2xl space-y-2 leading-relaxed ${
                m.sender === "user"
                  ? "bg-cyan-600 text-white rounded-br-none shadow-md"
                  : "bg-slate-100 dark:bg-white/[0.05] text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/10 rounded-bl-none shadow-xs"
              }`}
            >
              <div className="whitespace-pre-line font-normal">{m.text}</div>

              {/* Interactive Quote Card if generated */}
              {m.suggestedQuote && (
                <div className="mt-3 p-3 rounded-xl bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/15 space-y-2">
                  <div className="flex items-center justify-between font-bold text-[11px] text-cyan-700 dark:text-cyan-300">
                    <span>✨ Suggested Architecture: {m.suggestedQuote.solution}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div>Days: {m.suggestedQuote.expeditedDays || m.suggestedQuote.standardDays}d</div>
                    <div>Base: ₹{m.suggestedQuote.baseCost?.toLocaleString("en-IN")}</div>
                  </div>
                  {onApplyQuote && (
                    <button
                      type="button"
                      onClick={() => onApplyQuote(m.suggestedQuote)}
                      className="w-full py-1.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Sync to Visual Calculator</span>
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
            <span>Modernisum AI Architect is analyzing requirements &amp; calculus...</span>
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
          placeholder="Ask in English or Hindi (e.g. 25 buses ke sath app kitne din me banegi?)..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
        />
        <GlassButton
          variant="primary"
          size="sm"
          disabled={isLoading || !input.trim()}
          onClick={() => handleSendMessage()}
          className="px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </GlassButton>
      </div>
    </LiquidGlassCard>
  );
}
