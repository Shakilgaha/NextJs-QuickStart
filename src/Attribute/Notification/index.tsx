"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { removeToast } from "@/store/slices/toastSlice";

const containerPositions = {
  "top-right": "top-5 right-5 items-end",
  "top-left": "top-5 left-5 items-start",
  "bottom-right": "bottom-5 right-5 items-end",
  "bottom-left": "bottom-5 left-5 items-start",
  "top-center": "top-5 left-1/2 -translate-x-1/2 items-center",
  "bottom-center": "bottom-5 left-1/2 -translate-x-1/2 items-center",
} as const;

export default function ToastContainer() {
  const toasts = useAppSelector((state) => state.toast.toasts);
  const dispatch = useAppDispatch();

  // Group toasts by position (defaulting to top-right if not provided)
  const groupedToasts = toasts.reduce<Record<string, typeof toasts>>((acc, toast) => {
    const pos = toast.position || "top-right";
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(toast);
    return acc;
  }, {});

  const positionKeys = Object.keys(groupedToasts) as Array<keyof typeof containerPositions>;

  return (
    <>
      {positionKeys.map((pos) => (
        <div
          key={pos}
          className={`fixed z-[9999] flex flex-col gap-3 w-full max-w-md pointer-events-none p-4 ${containerPositions[pos]}`}
        >
          {groupedToasts[pos].map((toast) => (
            <ToastItem
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              position={pos}
              onClose={(id) => dispatch(removeToast(id))}
            />
          ))}
        </div>
      ))}
    </>
  );
}

interface ToastItemProps {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
  position: keyof typeof containerPositions;
  onClose: (id: string) => void;
}

function ToastItem({ id, message, type, duration = 3000, position, onClose }: ToastItemProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  
  const startTimeRef = useRef(0);
  const remainingTimeRef = useRef(duration);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleDismiss = useCallback(() => {
    setIsDismissing(true);
    setTimeout(() => {
      onClose(id);
    }, 200); // Must match the duration of exit animations
  }, [id, onClose]);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timeoutIdRef.current = setTimeout(handleDismiss, remainingTimeRef.current);
  }, [handleDismiss]);

  const stopTimer = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [startTimer]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    stopTimer();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimer();
  };

  // Dynamic animations based on layout position & dismissing state
  const getAnimationClass = () => {
    const isTop = position.startsWith("top");
    const isLeft = position.endsWith("left");
    const isCenter = position.endsWith("center");

    if (isDismissing) {
      if (isLeft) return "animate-[slideOutLeft_0.2s_ease-in_forwards]";
      if (isCenter) {
        return isTop
          ? "animate-[slideOutTop_0.2s_ease-in_forwards]"
          : "animate-[slideOutBottom_0.2s_ease-in_forwards]";
      }
      return "animate-[slideOutRight_0.2s_ease-in_forwards]";
    } else {
      if (isLeft) return "animate-[slideInLeft_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]";
      if (isCenter) {
        return isTop
          ? "animate-[slideInTop_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]"
          : "animate-[slideInBottom_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]";
      }
      return "animate-[slideInRight_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]";
    }
  };

  // Glassmorphism theme styling for each type
  const themeClasses = {
    success: {
      border: "border-emerald-500/20 dark:border-emerald-400/20",
      shadow: "shadow-emerald-500/5 dark:shadow-emerald-500/10",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
      progressBarBg: "bg-emerald-500",
    },
    error: {
      border: "border-rose-500/20 dark:border-rose-400/20",
      shadow: "shadow-rose-500/5 dark:shadow-rose-500/10",
      iconBg: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
      progressBarBg: "bg-rose-500",
    },
    info: {
      border: "border-blue-500/20 dark:border-blue-400/20",
      shadow: "shadow-blue-500/5 dark:shadow-blue-500/10",
      iconBg: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
      progressBarBg: "bg-blue-500",
    },
  };

  const currentTheme = themeClasses[type];

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex items-center gap-3.5 p-4 pr-5 rounded-2xl border backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 shadow-lg pointer-events-auto transition-all duration-300 relative overflow-hidden select-none w-full max-w-sm ${currentTheme.border} ${currentTheme.shadow} ${getAnimationClass()}`}
    >
      {/* Icon Area */}
      <span className={`p-1.5 rounded-xl shrink-0 ${currentTheme.iconBg}`}>
        {type === "success" && (
          <svg className="h-5 w-5 animate-[toastIconPulse_0.4s_ease-out_forwards]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {type === "error" && (
          <svg className="h-5 w-5 animate-[toastIconShake_0.4s_ease-in-out_1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )}
        {type === "info" && (
          <svg className="h-5 w-5 animate-[toastIconPulse_0.4s_ease-out_forwards]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </span>

      {/* Message Area */}
      <div className="flex-1 text-sm font-medium tracking-wide text-zinc-800 dark:text-zinc-200">
        {message}
      </div>

      {/* Close Button */}
      <button
        onClick={handleDismiss}
        className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 transition-all duration-200 hover:rotate-90 hover:scale-110 pointer-events-auto shrink-0 p-0.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Auto-Dismiss Progress Bar Indicator */}
      <div
        className={`absolute bottom-0 left-0 h-[3px] w-full origin-left ${currentTheme.progressBarBg}`}
        style={{
          animationName: "shrinkWidth",
          animationDuration: `${duration}ms`,
          animationTimingFunction: "linear",
          animationFillMode: "forwards",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      />
    </div>
  );
}
