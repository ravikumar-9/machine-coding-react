import React from "react";

interface PillProps {
  image: string;
  text: string;
  onClick: () => void;
}

const Pill = ({ image, text, onClick }: PillProps) => {
  return (
    <span
      className="flex items-center gap-2 bg-slate-900 rounded-full text-white p-2 cursor-pointer"
      onClick={onClick}
    >
      <img src={image} alt={text} className="h-6 w-6" />
      <span>{text} &times;</span>
    </span>
  );
};

export default Pill;
