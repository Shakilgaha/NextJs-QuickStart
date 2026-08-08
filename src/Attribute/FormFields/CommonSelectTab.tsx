"use client";

import React from "react";

export interface CommonSelectTabOption {
  label: string;
  value: string;
}

export interface CommonSelectTabProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  options: CommonSelectTabOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  containerClassName?: string;
}

export default function CommonSelectTab({
  label,
  options,
  value,
  onChange,
  error,
  containerClassName = "",
  className = "",
  ...props
}: CommonSelectTabProps) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`} {...props}>
      {label && (
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
      )}
      <div className={`flex border border-zinc-350 dark:border-zinc-700 rounded-lg p-1 bg-zinc-50 dark:bg-zinc-900 w-fit ${className}`}>
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange && onChange(opt.value)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                isSelected
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-zinc-100"
                  : "text-zinc-550 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {error && (
        <span className="text-sm text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
}
