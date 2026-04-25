import React from "react";
import Button from "../components/ui/button";
import useToast from "../hooks/useToast";

const CustomToast = () => {
  const { triggerNotification, ToastComponent } = useToast({
    position: "topRight",
  });
  return (
    <>
      <Button
        variant="primary"
        onClick={() =>
          triggerNotification({
            type: "success",
            message: "New notification",
            onClose: () => {},
          })
        }
      >
        Trigger success
      </Button>
      <Button
        variant="primary"
        onClick={() =>
          triggerNotification({
            type: "danger",
            message: "New notification",
            onClose: () => {},
          })
        }
      >
        Trigger Danger
      </Button>
      <Button
        variant="primary"
        onClick={() =>
          triggerNotification({
            type: "info",
            message: "New notification",
            onClose: () => {},
          })
        }
      >
        Trigger Info
      </Button>
      <Button
        variant="primary"
        onClick={() =>
          triggerNotification({
            type: "warning",
            message: "New notification",
            onClose: () => {},
          })
        }
      >
        Trigger Warning
      </Button>
      <ToastComponent />
    </>
  );
};

export default CustomToast;
