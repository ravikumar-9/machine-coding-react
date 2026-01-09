import React from "react";

interface PropTypes {
  text: string;
  query: string;
}

const TextHighlight: React.FC<PropTypes> = ({ text, query }) => {
  if (!query.trim()) return <>{text}</>; // show full text if query is empty

  const escapeRegex = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex chars

  const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="bg-amber-400 font-semibold text-white">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export default TextHighlight;
