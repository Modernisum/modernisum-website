"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, label, error, icon, rightIcon, isPassword = false, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 tracking-wider uppercase font-tech">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
              {icon}
            </div>
          )}
          <input
            type={inputType}
            ref={ref}
            className={cn(
              "glass-input w-full px-4 py-2.5 text-sm transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500",
              icon && "pl-11",
              (rightIcon || isPassword) && "pr-11",
              error && "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20",
              className
            )}
            {...props}
          />
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 focus:outline-none transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          ) : (
            rightIcon && (
              <div className="absolute right-3.5 flex items-center text-slate-400">
                {rightIcon}
              </div>
            )
          )}
        </div>
        {error && <p className="text-xs text-rose-400 pl-1">{error}</p>}
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";
