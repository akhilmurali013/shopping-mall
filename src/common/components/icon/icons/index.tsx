import React from "react";

import { ReactComponent as ArrowLeft } from "./arrow-left.svg";
import { ReactComponent as ArrowRight } from "./arrow-right.svg";
import { ReactComponent as Filter } from "./filter.svg";
import { ReactComponent as Logout } from "./logout.svg";
import { ReactComponent as Plus } from "./plus.svg";
import { ReactComponent as Right } from "./right.svg";
import { ReactComponent as ShoppingBag } from "./shopping-bag.svg";

const icons: {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  filter: Filter,
  logout: Logout,
  plus: Plus,
  right: Right,
  "shopping-bag": ShoppingBag,
};

export default icons;
