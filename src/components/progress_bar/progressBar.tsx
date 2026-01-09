import React from "react";
import type { progressbarProps } from "../../types";

const ProgressBar = (props: progressbarProps) => {
  const { percentage } = props;
  return (
    <div className="flex items-center justify-center my-6">
      <div
        className="flex items-center relative border border-slate-200 rounded-lg h-2.5 w-96 overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-label={`Progress : ${percentage}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-bold text-xs z-10 transition-all ease-in-out  ${
              percentage < 42 ? "text-gray-700" : "text-white"
            }`}
          >
            {percentage}%
          </span>
        </div>
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-lg py-2 transition-all ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default React.memo(ProgressBar);
