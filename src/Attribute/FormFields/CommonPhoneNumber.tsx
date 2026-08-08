"use client";

import React, { forwardRef } from "react";

export interface CommonPhoneNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
  containerClassName?: string;
}

const CommonPhoneNumber = forwardRef<HTMLInputElement, CommonPhoneNumberProps>(
  ({ label, error, countryCode = "+1", onCountryCodeChange, containerClassName = "", className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const inputClasses = [
      "w-full pl-20 pr-3.5 py-2 rounded-lg border text-base outline-none transition-all duration-200",
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
            htmlFor={inputId}
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            value={countryCode}
            onChange={(e) => onCountryCodeChange && onCountryCodeChange(e.target.value)}
            className="absolute left-0 h-full border-r border-zinc-300 dark:border-zinc-700 bg-zinc-55 dark:bg-zinc-900 text-zinc-750 dark:text-zinc-300 text-sm font-medium rounded-l-lg pl-3 pr-2 outline-none cursor-pointer appearance-none"
          >
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+91">+91</option>
            <option value="+86">+86</option>
            <option value="+49">+49</option>
            <option value="+33">+33</option>
          </select>
          <input
            id={inputId}
            ref={ref}
            type="tel"
            className={inputClasses}
            {...props}
          />
        </div>
        {error && (
          <span className="text-sm text-red-500 font-medium">{error}</span>
        )}
      </div>
    );
  }
);

CommonPhoneNumber.displayName = "CommonPhoneNumber";

export default CommonPhoneNumber;
