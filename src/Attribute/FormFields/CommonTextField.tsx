"use client";

import React, { forwardRef } from "react";

export interface CommonTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const CommonTextField = forwardRef<HTMLInputElement, CommonTextFieldProps>(
  ({ label, error, containerClassName = "", className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const inputClasses = [
      "w-full px-3.5 py-2 rounded-lg border text-base outline-none transition-all duration-200",
      "bg-white border-zinc-350 text-zinc-900 focus:border-zinc-905 focus:ring-1 focus:ring-zinc-900",
      "dark:bg-zinc-950 dark:border-zinc-700 dark:text-zinc-150 dark:focus:border-zinc-300 dark:focus:ring-zinc-300",
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500"
        : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}
        <input id={inputId} ref={ref} className={inputClasses} {...props} />
        {error && (
          <span className="text-sm text-red-500 font-medium">{error}</span>
        )}
      </div>
    );
  }
);

CommonTextField.displayName = "CommonTextField";

export default CommonTextField;
