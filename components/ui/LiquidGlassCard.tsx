"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "emerald" | "amber" | string;
  elevated?: boolean;
  interactive?: boolean;
}

export function LiquidGlassCard({
  children,
  className,
  glowColor = "cyan",
  elevated = false,
  interactive = true,
  ...props
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColorsMap: Record<string, string> = {
    cyan: "rgba(0, 242, 254, 0.15)",
    purple: "rgba(121, 40, 202, 0.18)",
    emerald: "rgba(16, 185, 129, 0.15)",
    amber: "rgba(245, 158, 11, 0.16)",
  };

  const activeGlow = glowColorsMap[glowColor] || glowColor;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        elevated ? "glass-panel-elevated" : "glass-panel",
        className
      )}
      {...props}
    >
      {/* Specular Spotlight tracking cursor */}
      {interactive && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${activeGlow}, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Top Specular Rim Reflection Highlight */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" 
        aria-hidden="true" 
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
