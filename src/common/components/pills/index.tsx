import React from "react";

import "./styles.less";

const styleMap = {
  primary: "primary",
  success: "success",
  error: "error",
};

export enum PillType {
  PRIMARY = "primary",
  SUCCESS = "success",
  ERROR = "error",
}

const Pill: React.FC<{
  type: PillType;
  text: string;
}> = ({ type, text }) => {
  const className = styleMap[type] ?? "primary";
  return <span className={`pill ${className}`}>{text}</span>;
};

export default Pill;
