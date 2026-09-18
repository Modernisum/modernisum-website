"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { Sparkles, Send, Bot, User, CornerDownLeft } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PRESET_QUERIES = [
  "How does Modern School bus tracking work?",
  "What AI SaaS architectures do you build?",
  "Do you build offline desktop applications?",
];

const KNOWLEDGE_RESPONSES: Record<string, string> = {
  "How does Modern School bus tracking work?":
    "Modern School ERP pairs onboard GPS telematics with low-latency WebSockets. Parents receive live bus telemetry on their Android/iOS apps, complete with speed monitoring and automated proximity arrival alerts 5-10 minutes prior to pickup.",
  "What AI SaaS architectures do you build?":
    "We engineer cognitive agent pipelines, automated document vision extraction (Gemini Vision), natural language semantic search, and autonomous customer workflows integrated into modern Next.js/Node.js web apps. (Note: We build software exclusively—no physical GPU clusters).",
  "Do you build offline desktop applications?":
    "Yes! We build high-throughput desktop suites using Flutter Desktop and C# with embedded SQLite storage and direct USB/serial device drivers (RFID cards, biometric scanners, thermal printers), syncing seamlessly to cloud backends whenever online.",
};

export function HeroAIChatPreview() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am the Modernisum Architecture AI. Inquire about our software engineering, Modern School ERP, or custom AI SaaS capabilities.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      let response = KNOWLEDGE_RESPONSES[query];
      if (!response) {
        if (query.toLowerCase().includes("school") || query.toLowerCase().includes("erp")) {
          response =
            "Modern School ERP is our unified school ecosystem: Desktop Admin Panel, Teacher/Student/Parent apps, RFID smart attendance, and GPS bus telemetry!";
        } else if (query.toLowerCase().includes("gpu") || query.toLowerCase().includes("hardware")) {
          response =
            "Modernisum is strictly a software engineering company. We do not sell or operate GPU hardware clusters; we build high-performance software, cloud SaaS, and AI integrations.";
        } else {
          response =
            "Modernisum delivers high-performance AI SaaS, modern web applications (Next.js/React 19), mobile apps (Flutter), and custom device software. Contact our team at contact@modernisum.com to build your vision!";
        }
      }
      setMessages([...newMessages, { role: "assistant", content: response }]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-24">
      <LiquidGlassCard
        glowColor="rgba(0, 242, 254, 0.12)"
        className="p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-white/15 bg-white/80 dark:bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-white/10 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium tracking-wider uppercase ml-2">
              Modernisum.AI // Cognitive Engine Simulator
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] text-cyan-700 dark:text-cyan-300">
            <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            <span>Interactive Demo</span>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="space-y-3.5 max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10">
          <AnimatePresence initial={false}>
            {messages.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 text-xs sm:text-sm ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 border border-cyan-500/30 dark:border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-600 dark:text-cyan-300">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md"
                      : "bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 backdrop-blur-md"
                  }`}
                >
                  {m.content}
                </div>
                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-purple-500/15 dark:bg-purple-500/20 border border-purple-500/30 dark:border-purple-500/40 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-300">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex gap-3 text-xs sm:text-sm items-center">
              <div className="w-7 h-7 rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 border border-cyan-500/30 dark:border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-600 dark:text-cyan-300">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400 rounded-2xl px-4 py-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-slate-600 dark:text-slate-400 ml-1">Analyzing knowledge base...</span>
              </div>
            </div>
          )}
        </div>

        {/* Preset Query Chips */}
        <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/5 flex flex-wrap gap-2">
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(preset)}
              className="text-[11px] sm:text-xs px-3 py-1 rounded-full bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all text-left truncate max-w-full cursor-pointer"
            >
              ⚡ {preset}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-3 flex gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Modernisum AI about school ERP, mobile apps, or SaaS..."
              className="w-full rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/15 px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-sans"
            />
          </div>
          <GlassButton
            type="submit"
            variant="primary"
            size="sm"
            disabled={loading || !input.trim()}
            icon={<Send className="w-3.5 h-3.5" />}
          />
        </form>
      </LiquidGlassCard>
    </div>
  );
}
