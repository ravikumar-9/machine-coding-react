import { Minus, Plus } from "lucide-react";
import type React from "react";

const Accordion = ({
  title,
  children,
  isOpen,
  onChange,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onChange: () => void;
}) => {
  return (
    <div className="w-full max-w-xl mx-auto mb-4">
      <div
        onClick={onChange}
        className="cursor-pointer rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-white text-sm md:text-base font-semibold tracking-wide">
            {title}
          </h2>

          {isOpen ? (
            <Minus className="h-5 w-5 transition-transform duration-300 text-white" />
          ) : (
            <Plus className="h-5 w-5 transition-transform duration-300 text-white" />
          )}
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 text-gray-300 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
