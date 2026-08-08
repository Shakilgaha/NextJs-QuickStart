"use client";

import React from "react";

export interface CommonRadioOption {
  label: string;
  value: string;
}

export interface CommonRadioProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  name: string;
  options: CommonRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  containerClassName?: string;
}

export default function CommonRadio({
  label,
  name,
  options,
  value,
  onChange,
  error,
  containerClassName = "",
  className = "",
  ...props
}: CommonRadioProps) {
  return (
    <div className={`flex flex-col gap-2 w-full ${containerClassName}`} {...props}>
      {label && (
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
      )}
      <div className={`flex flex-wrap gap-4 ${className}`}>
        {options.map((opt) => {
          const radioId = `${name}-${opt.value}`;
          return (
            <div key={opt.value} className="flex items-center gap-2">
              <input
                id={radioId}
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange && onChange(opt.value)}
                className="h-4 w-4 border-zinc-350 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-zinc-300 cursor-pointer"
              />
              <label
                htmlFor={radioId}
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer select-none"
              >
                {opt.label}
              </label>
            </div>
          );
        })}
      </div>
      {error && (
        <span className="text-sm text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
}
