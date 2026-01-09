import React from "react";
import type { inputProps } from "../../types";

const Input = (props: inputProps) => {
  const { className = "", required, label, message, ...rest } = props;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        required={required}
        className={`
          w-full px-3 py-2 
          border border-slate-300 rounded-lg 
          text-gray-800 text-sm 
          placeholder:text-gray-400
          focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          transition-all duration-150
          outline-none
          ${className}
        `}
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

export default Input;
