import React from "react";

import "./styles.less";

const ModuleLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="module-layout">{children}</div>
);

const Header: React.FC<
  React.PropsWithChildren<
    React.HTMLProps<HTMLDivElement> & {
      header: string;
    }
  >
> = ({ header, children }) => (
  <div className="module-header">
    <h2 className="header-text">{header}</h2>
    {children && <div className="child-wrapper">{children}</div>}
  </div>
);

export default Object.assign(ModuleLayout, { Header });
