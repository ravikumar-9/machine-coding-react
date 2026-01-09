import React from "react";
import { useState } from "react";
import EmailVerification from "../components/forget_password/email_verification";
import OTPInput from "../components/forget_password/otp_input";
import SetPassword from "../components/forget_password/set_password";

const ForgetPassword = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div>
      <div className=""></div>
      {activeStep === 1 && (
        <EmailVerification
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === 2 && (
        <OTPInput activeStep={activeStep} setActiveStep={setActiveStep} />
      )}
      {activeStep === 3 && <SetPassword />}
    </div>
  );
};

export default ForgetPassword;
