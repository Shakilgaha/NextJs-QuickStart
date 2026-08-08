"use client";

import React, { forwardRef } from "react";

export interface CommonQuillInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const CommonQuillInput = forwardRef<HTMLTextAreaElement, CommonQuillInputProps>(
  ({ label, error, containerClassName = "", className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const textareaClasses = [
      "w-full px-3.5 py-2 rounded-lg border text-base outline-none transition-all duration-200 min-h-[120px] resize-y",
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
        <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden flex flex-col">
          {/* Mock Quill Toolbar */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 text-sm select-none">
            <button type="button" className="font-bold hover:text-zinc-905 dark:hover:text-zinc-100 px-1" title="Bold">B</button>
            <button type="button" className="italic hover:text-zinc-905 dark:hover:text-zinc-100 px-1" title="Italic">I</button>
            <button type="button" className="underline hover:text-zinc-905 dark:hover:text-zinc-100 px-1" title="Underline">U</button>
            <span className="w-px h-4 bg-zinc-300 dark:bg-zinc-700" />
            <button type="button" className="hover:text-zinc-900 dark:hover:text-zinc-100 px-1" title="List bullet">• List</button>
            <button type="button" className="hover:text-zinc-900 dark:hover:text-zinc-100 px-1" title="List ordered">1. List</button>
          </div>
          <textarea
            id={inputId}
            ref={ref}
            className={`${textareaClasses} border-none rounded-none`}
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

CommonQuillInput.displayName = "CommonQuillInput";

export default CommonQuillInput;
