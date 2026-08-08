"use client";

import React, { forwardRef } from "react";

export interface CommonSelectOption {
  label: string;
  value: string;
}

export interface CommonSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: CommonSelectOption[];
  error?: string;
  containerClassName?: string;
}

const CommonSelect = forwardRef<HTMLSelectElement, CommonSelectProps>(
  ({ label, options, error, containerClassName = "", className = "", id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const selectClasses = [
      "w-full px-3.5 py-2 rounded-lg border text-base outline-none transition-all duration-200 cursor-pointer appearance-none bg-no-repeat bg-[right_1rem_center]",
      "bg-white border-zinc-350 text-zinc-900 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900",
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
            htmlFor={selectId}
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select id={selectId} ref={ref} className={selectClasses} {...props}>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-550 dark:text-zinc-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {error && (
          <span className="text-sm text-red-500 font-medium">{error}</span>
        )}
      </div>
    );
  }
);

CommonSelect.displayName = "CommonSelect";

export default CommonSelect;
