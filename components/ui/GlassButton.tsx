"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface GlassButtonProps extends HTMLMotionProps<"button"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "pill" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export function GlassButton({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  className,
  disabled,
  ...props
}: GlassButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base font-semibold",
  };

  const variantStyles = {
    primary: "glass-button-primary",
    secondary: "glass-button-secondary",
    pill: "glass-pill text-slate-800 dark:text-white/90 hover:text-cyan-600 dark:hover:text-white",
    ghost: "bg-transparent hover:bg-slate-200/50 dark:hover:bg-white/5 text-slate-700 dark:text-white/80 hover:text-slate-950 dark:hover:text-white border-transparent",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 450, damping: 20 }}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {icon && iconPosition === "left" && <span className="inline-flex">{icon}</span>}
          {children && <span>{children}</span>}
          {icon && iconPosition === "right" && <span className="inline-flex">{icon}</span>}
        </>
      )}
    </motion.button>
  );
}
