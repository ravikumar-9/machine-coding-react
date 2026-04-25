import { AlertCircle, CheckCircle, Info, ShieldX, X } from "lucide-react";
import React from "react";
import { useEffect, useRef } from "react";

const Toast = ({
  type,
  message,
  onClose,
}: {
  type: "success" | "info" | "warning" | "danger";
  message: string;
  id: number;
  onClose: () => void;
}) => {
  const timerRef = useRef<number | null>(null);
  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
    danger: <ShieldX className="h-5 w-5" />,
  };
  const styles = {
    success: "bg-green-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      onClose();
    }, 3000);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startTimer();
    return () => pauseTimer();
  }, []);

  return (
    <div
      className={`flex items-center justify-between w-fit px-2 py-2 rounded-md m-4 text-sm font-sans text-white ${styles[type]}`}
    >
      <div className="flex items-center gap-2">
        {icons[type]}
        {message}
      </div>
      <X className="h-6 w-6 cursor-pointer" />
    </div>
  );
};

export default Toast;
