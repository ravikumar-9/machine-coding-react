import React from "react";
import type { textareaProps } from "../../types";
import { cn } from "../../utils/helpers";

const TextArea = (props: textareaProps) => {
  const { label, message, className, required, ...rest } = props;
  return (
    <div className="w-full space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <textarea
        className={cn(
          "w-full px-3 py-2 border border-slate-300 rounded-lg text-gray-800 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-150 outline-none",
          className
        )}
        {...rest}
      />
      <div className="h-4">
        {message && (
          <span className="text-xs text-red-500 w-full block leading-none">
            {message}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextArea;
