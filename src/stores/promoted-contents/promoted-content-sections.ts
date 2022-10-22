import React from "react";

import PopularStoresForm from "./pages/details-form/components/popular-stores-form";
import RecentlyLaunchedStoresForm from "./pages/details-form/components/recently-launched-stores-form";
import TodaysDealsForm from "./pages/details-form/components/todays-deals-form";
import TryItOutForm from "./pages/details-form/components/try-it-out-form";
import PopularStores from "./pages/list/components/sections/popular-stores";
import RecentlyLaunchedStores from "./pages/list/components/sections/recent-stores";
import TodaysDeals from "./pages/list/components/sections/todays-deals";
import TryItOut from "./pages/list/components/sections/try-it-out";

type PromotedSectionType = {
  id: string;
  header: string;
  description: string;
  Component: React.FC;
  noOfItems: number;
  Form: React.FC;
};

export const TryItOutSection: PromotedSectionType = {
  id: "try-it-out",
  header: "Try it out",
  description: "Shopping landing page -> Full width banners",
  Component: TryItOut,
  noOfItems: 5,
  Form: TryItOutForm,
};

export const TodaysDealsSection: PromotedSectionType = {
  id: "todays-deals",
  header: "Today's Deals",
  description: "Shopping landing page -> Small cards with offers",
  Component: TodaysDeals,
  noOfItems: 10,
  Form: TodaysDealsForm,
};

export const PopularStoresSection: PromotedSectionType = {
  id: "popular-stores",
  header: "Popular stores",
  description:
    "Homepage, Shopping landing page -> Small cards with store images",
  Component: PopularStores,
  noOfItems: 10,
  Form: PopularStoresForm,
};

export const RecentlyLaunchedSection: PromotedSectionType = {
  id: "recently-launched",
  header: "Recently launched",
  description: "Shopping landing page -> Small cards with store images",
  Component: RecentlyLaunchedStores,
  noOfItems: 10,
  Form: RecentlyLaunchedStoresForm,
};

const promotedSectionsList: PromotedSectionType[] = [
  TryItOutSection,
  TodaysDealsSection,
  PopularStoresSection,
  RecentlyLaunchedSection,
];

export default promotedSectionsList;
