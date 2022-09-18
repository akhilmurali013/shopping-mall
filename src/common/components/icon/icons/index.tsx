import React from "react";

import { ReactComponent as Filter } from "./filter.svg";
import { ReactComponent as Logout } from "./logout.svg";
import { ReactComponent as ShoppingBag } from "./shopping-bag.svg";

const icons: {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
  filter: Filter,
  logout: Logout,
  "shopping-bag": ShoppingBag,
};

export default icons;
