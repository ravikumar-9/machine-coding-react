import React, { useCallback } from "react";
import type { EmailVerificationProps } from "../../types";
import Button from "../ui/button";
import Card from "../ui/Card";
import Input from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailFormSchema,
  type emailFormType,
} from "../../schema/forgetpasswordschema";

const EmailVerification = (props: EmailVerificationProps) => {
  const { setActiveStep, activeStep } = props;

  const handleSubmitEmail = useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep]);

  const form = useForm<emailFormType>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="bg-gray-50 border border-slate-200">
        <form onSubmit={form.handleSubmit(handleSubmitEmail)}>
          <h2 className="text-center font-bold">Forget Password</h2>
          <Input
            required
            type="email"
            label="E-mail"
            placeholder="Enter E-mail"
            {...form.register("email")}
          />
          <Button variant="primary" className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default React.memo(EmailVerification);
