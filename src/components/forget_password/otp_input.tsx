import React, { useCallback, useRef } from "react";
import Input from "../ui/input";
import Card from "../ui/Card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  otpFormSchema,
  type otpFormType,
} from "../../schema/forgetpasswordschema";
import Button from "../ui/button";
import type { OtpFormProps } from "../../types";

const OTPInput = (props: OtpFormProps) => {
  const { activeStep, setActiveStep } = props;

  const inputRef = useRef<HTMLInputElement[]>([]);

  const form = useForm<otpFormType>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: ["", "", "", ""],
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (value.length > 1) {
      return;
    }

    if (value && !/^\d$/.test(value)) {
      form.setError("otp", { message: "OTP must be a number" });
      return;
    }

    form.setValue(`otp.${index}`, value);
    form.clearErrors("otp");

    if (value && index < 3) {
      inputRef.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const currentValue = e.currentTarget.value;
      if (!currentValue && index > 0) {
        e.preventDefault();
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const value = e.clipboardData.getData("Text");
    console.log(value);
    if (!value) {
      return;
    }
    if (value && value.length !== 4) {
      return;
    }
    if (!/^\d{4}$/.test(value)) {
      form.setError("otp", { message: "OTP must be a number" });
      return;
    }
    value?.split("")?.forEach((val, index) => {
      form.setValue(`otp.${index}`, val);
      inputRef.current[index].value = val;
    });
    form.clearErrors("otp");
    inputRef.current[3].focus();
  };

  const handleOTPSubmit = useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="bg-white border border-gray-600 flex flex-col items-center justify-center space-y-4">
        <h2 className="font-serif font-bold text-lg">OTP Verification</h2>
        <form onSubmit={form.handleSubmit(handleOTPSubmit)}>
          <div className="grid grid-cols-4 gap-3 w-56">
            {form.watch("otp")?.map((_, index) => (
              <Input
                required
                key={index}
                {...form.register(`otp.${index}`)}
                className="w-10 h-10 text-center"
                maxLength={1}
                type="text"
                inputMode="numeric"
                onChange={(e) => handleChange(e, index)}
                aria-label={`OTP-digit-${index + 1}`}
                aria-invalid={!!form.formState.errors?.otp?.[index]}
                ref={(el) => {
                  if (el) {
                    inputRef.current[index] = el;
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e)}
              />
            ))}
          </div>
          {form.formState.errors.otp?.message && (
            <span className="text-xs text-red-500 block">
              {form.formState.errors.otp?.message}
            </span>
          )}
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default React.memo(OTPInput);
