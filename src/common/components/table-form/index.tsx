import React from "react";

import "./styles.less";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="table-form">
    <div className="table-body">{children}</div>
  </div>
);

const Item: React.FC<
  React.PropsWithChildren<{
    label: string;
    subLabel?: string;
  }>
> = ({ label, subLabel, children }) => (
  <div className="table-row">
    <div className="table-label-cell">
      {label}
      {subLabel}
    </div>
    <div className="table-value-cell">{children}</div>
  </div>
);

const TableForm = {
  Layout,
  Item,
};

export default TableForm;
