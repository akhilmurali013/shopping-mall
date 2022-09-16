import React from "react";

const Container: React.FC<
  React.PropsWithChildren<
    {
      label: string;
    } & React.HTMLProps<HTMLDivElement>
  >
> = ({ label, children, ...props }) => (
  <div {...props}>
    <div
      style={{
        marginBottom: "6px",
        fontWeight: "500",
      }}
    >
      {label}
    </div>
    <div>{children}</div>
  </div>
);

export default Container;
