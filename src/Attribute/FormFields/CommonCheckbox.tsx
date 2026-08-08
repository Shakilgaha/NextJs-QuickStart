"use client";

import React, { forwardRef } from "react";

export interface CommonCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const CommonCheckbox = forwardRef<HTMLInputElement, CommonCheckboxProps>(
  ({ label, error, containerClassName = "", className = "", id, ...props }, ref) => {
    const checkboxId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={`flex flex-col gap-1 w-full ${containerClassName}`}>
        <div className="flex items-center gap-2">
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            className={`h-4 w-4 rounded border-zinc-350 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:ring-zinc-300 cursor-pointer ${className}`}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer select-none"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <span className="text-sm text-red-500 font-medium">{error}</span>
        )}
      </div>
    );
  }
);

CommonCheckbox.displayName = "CommonCheckbox";

export default CommonCheckbox;
