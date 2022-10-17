import React from "react";

import PromotedContentSection from "./components/sections";
import { CardProps } from "./components/sections/card";
import TryItOut from "./components/sections/try-it-out";

type PromotedSectionType = {
  id: string;
  header: string;
  description: string;
  Component: React.FC<CardProps>;
};

const promotedSectionsList: PromotedSectionType[] = [
  {
    id: "try-it-out",
    header: "Try it out",
    description: "Shopping landing page -> Full width banners",
    Component: TryItOut,
  },
  {
    id: "todays-deals",
    header: "Today's Deals",
    description: "Shopping landing page -> Small cards with offers",
    Component: PromotedContentSection,
  },
  {
    id: "popular-stores",
    header: "Popular stores",
    description:
      "Homepage, Shopping landing page -> Small cards with store images",
    Component: PromotedContentSection,
  },
  {
    id: "recently-launched",
    header: "Recently launched",
    description: "Shopping landing page -> Small cards with store images",
    Component: PromotedContentSection,
  },
];

export const promotedSectionsMap = promotedSectionsList.reduce(
  (acc, section) => {
    acc[section.id] = section;
    return acc;
  },
  {} as { [key: string]: PromotedSectionType }
);

export default promotedSectionsList;
