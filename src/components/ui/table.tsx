import React, { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn(
          "w-full border border-gray-600 rounded-lg text-left",
          className
        )}
        {...props}
      />
    </div>
  )
);

Table.displayName = "Table";

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "p-3 border-b border-b-white bg-gray-700 w-full font-semibold",
      className
    )}
    {...props}
  />
));

TableHeader.displayName = "TableHeader";

const TableHead = forwardRef<
  HTMLTableCellElement,
  HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-4 py-2 border-b border-b-gray-900 tracking-wide",
      className
    )}
    {...props}
  />
));

TableHead.displayName = "TableHead";

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("w-full divide-y divide-gray-700", className)}
    {...props}
  />
));

TableBody.displayName = "TableBody";

const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "hover:bg-gray-800 group bg-gray-900 transition-colors duration-150 ease-in-out cursor-pointer",
      className
    )}
    {...props}
  />
));

TableRow.displayName = "TableRow";

const TableCell = forwardRef<
  HTMLTableCellElement,
  HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-4 py-2 align-middle", className)}
    {...props}
  />
));

TableCell.displayName = "TableCell";

export { Table, TableHead, TableHeader, TableBody, TableCell, TableRow };
