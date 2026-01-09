import { useForm } from "react-hook-form";
import Card from "../ui/Card";
import Input from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  setPasswordSchema,
  type setPasswordFormType,
} from "../../schema/forgetpasswordschema";
import Button from "../ui/button";
import React from "react";

const SetPassword = () => {
  const form = useForm<setPasswordFormType>({
    resolver: zodResolver(setPasswordSchema),
  });

  const handleFormSubmit = () => {};

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <h2 className="font-bold font-serif">Update your password</h2>
          <Input
            type="password"
            label="Password"
            {...form.register("password")}
            message={form.formState.errors.password?.message}
          />
          <Input
            type="password"
            label="Confirm Password"
            {...form.register("confirmPassword")}
            message={form.formState.errors.confirmPassword?.message}
          />
          <Button type="submit" variant="primary">
            Change Password
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default React.memo(SetPassword);
