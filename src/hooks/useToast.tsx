import { useState } from "react";
import Toast from "../components/custom-toast/toast";

interface propTypes {
  type: "success" | "info" | "warning" | "danger";
  message: string;
  onClose: () => void;
}

interface ToastTypes extends propTypes {
  id: number;
}

const styles = {
  topRight: "fixed top-1 right-1 z-50",
  topLeft: "fixed top-1 left-1 z-50",
  bottomRight: "fixed bottom-1 right-1 z-50",
  bottomLeft: "fixed bottom-1 left-1 z-50",
};

const useToast = ({
  position = "topRight",
}: {
  position: "topRight" | "topLeft" | "bottomLeft" | "bottomRight";
}) => {
  const [toasts, setToasts] = useState<ToastTypes[]>([]);

  const triggerNotification = (props: propTypes) => {
    const uniqueId = Date.now();
    setToasts((prev) => {
      // Check if a toast with this ID (or message) already exists
      const isDuplicate = prev.some((t) => t.id === uniqueId);
      if (isDuplicate) return prev;

      return [...prev, { ...props, id: uniqueId }];
    });
  };

  const removeNotification=(id:number)=>{
    const updatedToasts=toasts?.filter((t)=>t?.id!==id);
    setToasts(updatedToasts);
  }

  const ToastComponent = () =>
    toasts?.length > 0 ? (
      <div className={styles[position]}>
        {toasts?.reverse()?.map((toast) => (
          <Toast {...toast}
          onClose={()=>removeNotification(toast?.id)}
           />
        ))}
      </div>
    ) : null;

  return { triggerNotification, ToastComponent };
};

export default useToast;
