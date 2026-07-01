// src/components/ProgressBar.tsx
"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  progress?: number; // 0-100, for controlled usage
  active?: boolean;    // if true and progress undefined, show indeterminate
}

export function ProgressBar({ progress, active }: ProgressBarProps) {
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (progress !== undefined || !active) return;
    // Indeterminate animation handled by CSS
  }, [progress, active]);

  if (progress !== undefined) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
      <div className="bg-blue-600 h-2.5 rounded-full animate-indeterminate w-1/2" />
    </div>
  );
}
