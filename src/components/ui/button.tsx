import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import type { buttonProps } from "../../types";
import { cn } from "../../utils/helpers";

const buttonStyles = cva(
  "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 px-4 py-2",
        outline:
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-400 px-4 py-2",
        danger:
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 px-4 py-2",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-5 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const Button = (props: buttonProps & VariantProps<typeof buttonStyles>) => {
  const { className, children, variant, size, ...rest } = props;

  return (
    <button
      {...rest}
      className={cn(buttonStyles({ variant, size, className }))}
    >
      {children}
    </button>
  );
};

export default Button;
