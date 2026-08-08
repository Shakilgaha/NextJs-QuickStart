"use client";

import React from "react";

export interface CommonSwitchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  containerClassName?: string;
}

export default function CommonSwitch({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  containerClassName = "",
  className = "",
  ...props
}: CommonSwitchProps) {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className={`flex flex-col gap-1 w-full ${containerClassName}`} {...props}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 dark:focus:ring-zinc-300 ${
            checked
              ? "bg-zinc-900 dark:bg-zinc-100"
              : "bg-zinc-200 dark:bg-zinc-800"
          } ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-zinc-950 shadow-sm ring-0 transition duration-200 ease-in-out ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        {label && (
          <span
            onClick={handleToggle}
            className={`text-sm font-medium text-zinc-700 dark:text-zinc-300 select-none ${
              !disabled ? "cursor-pointer" : "opacity-50"
            }`}
          >
            {label}
          </span>
        )}
      </div>
      {error && (
        <span className="text-sm text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
}
