import React from "react";

interface SectionSkeletonProps {
  height?: string;
  title?: string;
}

export function SectionSkeleton({ height = "h-96", title }: SectionSkeletonProps) {
  return (
    <div
      className={`w-full ${height} rounded-3xl border border-slate-200/60 dark:border-white/5 bg-slate-100/40 dark:bg-white/[0.02] backdrop-blur-md animate-pulse flex flex-col items-center justify-center p-8 my-6`}
    >
      <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3">
        <div className="w-4 h-4 rounded-full bg-cyan-400/40 animate-ping" />
      </div>
      {title && (
        <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
          Streaming {title}...
        </span>
      )}
    </div>
  );
}
