import { Select as selectPrimitive } from "radix-ui";
import React, {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { cn } from "../../utils/helpers";
import { ChevronDownIcon, ChevronUp } from "lucide-react";

const Select = selectPrimitive.Root;

const SelectValue = selectPrimitive.Value;

const SelectPortal = selectPrimitive.Portal;

const SelectGroup = selectPrimitive.Group;

const SelectTrigger = forwardRef<
  ElementRef<typeof selectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof selectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <selectPrimitive.Trigger ref={ref} className={cn("", className)} {...props}>
    <selectPrimitive.Icon className="text-violet11">
      <ChevronDownIcon />
    </selectPrimitive.Icon>
  </selectPrimitive.Trigger>
));

SelectTrigger.displayName = selectPrimitive.Trigger.displayName;

const ScrollUpButton = forwardRef<
  ElementRef<typeof selectPrimitive.SelectScrollUpButton>,
  ComponentPropsWithoutRef<typeof selectPrimitive.SelectScrollUpButton>
>(({ className, ...props }, ref) => (
  <selectPrimitive.ScrollUpButton ref={ref} {...props}>
    <ChevronUp />
  </selectPrimitive.ScrollUpButton>
));

ScrollUpButton.displayName = selectPrimitive.Trigger.displayName;

const ScrollDownButton = forwardRef<
  ElementRef<typeof selectPrimitive.SelectScrollDownButton>,
  ComponentPropsWithoutRef<typeof selectPrimitive.SelectScrollDownButton>
>(({ className, ...props }, ref) => (
  <selectPrimitive.ScrollDownButton ref={ref} {...props}>
    <ChevronUp />
  </selectPrimitive.ScrollDownButton>
));

ScrollDownButton.displayName = selectPrimitive.Trigger.displayName;
