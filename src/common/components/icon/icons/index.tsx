import React from "react";

import { ReactComponent as ArrowLeft } from "./arrow-left.svg";
import { ReactComponent as ArrowRight } from "./arrow-right.svg";
import { ReactComponent as Bin } from "./bin.svg";
import { ReactComponent as Check } from "./check.svg";
import { ReactComponent as Close } from "./close.svg";
import { ReactComponent as Filter } from "./filter.svg";
import { ReactComponent as Logout } from "./logout.svg";
import { ReactComponent as LoudSpeaker } from "./loud-speaker.svg";
import { ReactComponent as Pencil } from "./pencil.svg";
import { ReactComponent as Plus } from "./plus.svg";
import { ReactComponent as Right } from "./right.svg";
import { ReactComponent as Search } from "./search.svg";
import { ReactComponent as ShoppingBag } from "./shopping-bag.svg";
import { ReactComponent as View } from "./view.svg";

const icons: {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  bin: Bin,
  check: Check,
  close: Close,
  filter: Filter,
  logout: Logout,
  "loud-speaker": LoudSpeaker,
  pencil: Pencil,
  plus: Plus,
  right: Right,
  search: Search,
  "shopping-bag": ShoppingBag,
  view: View,
};

export default icons;
