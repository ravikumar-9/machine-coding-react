import React from "react";
import { useEffect, useState } from "react";
import ProgressBar from "../components/progress_bar/progressBar";

const Progressbar = () => {
  const [reading, setReading] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setReading((prev) => {
        if (prev >= 100) {
          clearInterval(id);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div>
      <ProgressBar percentage={reading} />
    </div>
  );
};

export default Progressbar;
