"use client";

import React from "react";
import CommonDateSelector from "./CommonDateSelector";

export interface CommonDateRangeSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (val: string) => void;
  onEndDateChange?: (val: string) => void;
  startDatePlaceholder?: string;
  endDatePlaceholder?: string;
  error?: string;
  containerClassName?: string;
}

export default function CommonDateRangeSelector({
  label,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startDatePlaceholder = "Start Date",
  endDatePlaceholder = "End Date",
  error,
  containerClassName = "",
  className = "",
  ...props
}: CommonDateRangeSelectorProps) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`} {...props}>
      {label && (
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
      )}
      <div className={`flex flex-col sm:flex-row items-center gap-2 w-full ${className}`}>
        <CommonDateSelector
          placeholder={startDatePlaceholder}
          value={startDate}
          onChange={(e) => onStartDateChange && onStartDateChange(e.target.value)}
          className="w-full"
        />
        <span className="text-zinc-400 dark:text-zinc-550 font-medium hidden sm:block">to</span>
        <CommonDateSelector
          placeholder={endDatePlaceholder}
          value={endDate}
          onChange={(e) => onEndDateChange && onEndDateChange(e.target.value)}
          className="w-full"
        />
      </div>
      {error && (
        <span className="text-sm text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
}
