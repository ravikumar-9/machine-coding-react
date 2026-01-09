import z from "zod";

export const emailFormSchema = z.object({
  email: z.string().email({ error: "Enter a valid email" }),
});

export const otpFormSchema = z.object({
  otp: z
    .array(z.string().length(1).regex(/^\d+$/, "OTP must be numbers"))
    .length(4),
});

export const setPasswordSchema = z
  .object({
    password: z.string().min(6, "The password must be 6 characters long"),
    confirmPassword: z.string().min(6, ""),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export type emailFormType = z.infer<typeof emailFormSchema>;
export type otpFormType = z.infer<typeof otpFormSchema>;
export type setPasswordFormType = z.infer<typeof setPasswordSchema>;
