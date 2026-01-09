import z from "zod";

export const incomeSchema = z.object({
  date: z.string().min(1, "required"),
  income: z.string().min(1, "required"),
});

export type incomeFormType = z.infer<typeof incomeSchema>;

export const expenseSchema = z.object({
  date: z.string().min(1, "required"),
  amount: z.string().min(1, "amount is required"),
  category: z.string().min(1, "category required"),
  notes: z.string().optional(),
});

export type expenseFormType = z.infer<typeof expenseSchema>;
