import React from "react";

import "./styles.less";

const Label: React.FC<React.PropsWithChildren> = ({ children }) => (
  <label className="label">{children}</label>
);

export default Label;
