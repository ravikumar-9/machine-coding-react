import { z } from "zod";

/* =======================
   SHIPPING SCHEMA
======================= */

export const shippingformSchema = z.object({
  fullName: z.string().min(1, "required"),

  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must contain only digits")
    .min(10, "Enter valid phone number"),

  email: z.string().email("Enter a valid email"),

  address: z.string().min(1, "Address is required"),

  city: z.string().min(1, "City is required"),

  postalCode: z
    .string()
    .regex(/^\d{6}$/, "Postal code must contain only digits")
    .min(6, "Enter valid postal code")
    .max(6),

  state: z.string().min(1, "State is required"),
});

/* =======================
   PAYMENT BASE SCHEMA
   (NO refine here)
======================= */

export const paymentFormBaseSchema = z.object({
  paymentMethod: z.enum(["card", "upi"], {
    error: "Select a payment method",
  }),

  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be 16 digits")
    .optional(),

  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date")
    .optional(),

  cvv: z
    .string()
    .regex(/^\d{3}$/, "CVV must be 3 digits")
    .optional(),

  nameOnCard: z.string().min(1, "Name on card is required").optional(),

  upiId: z
    .string()
    .regex(/^[\w.-]{2,}@[a-zA-Z]{3,}$/, "Enter a valid UPI ID")
    .optional(),
});

/* =======================
   PAYMENT FINAL SCHEMA
   (Submit-time validation)
======================= */

export const paymentformSchema = paymentFormBaseSchema.superRefine(
  (data, ctx) => {
    if (data.paymentMethod === "card") {
      if (!data.cardNumber) {
        ctx.addIssue({
          path: ["cardNumber"],
          message: "Card number is required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.expiryDate) {
        ctx.addIssue({
          path: ["expiryDate"],
          message: "Expiry date is required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.cvv) {
        ctx.addIssue({
          path: ["cvv"],
          message: "CVV is required",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.nameOnCard) {
        ctx.addIssue({
          path: ["nameOnCard"],
          message: "Name on card is required",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (data.paymentMethod === "upi") {
      if (!data.upiId) {
        ctx.addIssue({
          path: ["upiId"],
          message: "UPI ID is required",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  }
);

/* =======================
   STEPPER FORM SCHEMA
   (Shipping + Partial Payment)
======================= */

export const stepperformschema = shippingformSchema.merge(
  paymentFormBaseSchema.partial()
);

/* =======================
   TYPES
======================= */

export type shippingFormType = z.infer<typeof shippingformSchema>;
export type paymentFormType = z.infer<typeof paymentformSchema>;
export type stepperformsType = z.infer<typeof stepperformschema>;
