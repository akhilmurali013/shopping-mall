import React from "react";

const Sidebar: React.FC<{ a: string; b: string }> = ({ a, b }) => {
  const x = 1234;
  console.log({ x, a, b });
  return <div>123455</div>;
};

export default Sidebar;
