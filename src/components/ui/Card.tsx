import React from "react";
import type { cardProps } from "../../types";

const Card = (props: cardProps) => {
  const { className, children } = props;
  return <div className={`border rounded-md p-3 ${className}`}>{children}</div>;
};

export default Card;
