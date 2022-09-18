import React from "react";

import icons from "./icons";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name?: string;
}

const Icon: React.FC<IconProps> = ({ name, ...rest }) => {
  if (!name) return null;
  const IconComponent = icons[name];

  if (!IconComponent) return null;
  return <IconComponent {...rest} />;
};

export default Icon;
