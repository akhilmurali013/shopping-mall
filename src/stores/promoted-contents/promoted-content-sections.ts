import { PromotedSectionType } from "common/components/promoted-content/promoted-content-filter";
import { root } from "stores/config";
import routes from "stores/promoted-contents/routes";

import PopularStoresForm from "./pages/details-forms/popular-stores-form";
import RecentlyLaunchedStoresForm from "./pages/details-forms/recently-launched-stores-form";
import TodaysDealsForm from "./pages/details-forms/todays-deals-form";
import TryItOutForm from "./pages/details-forms/try-it-out-form";
import PopularStores from "./pages/sections/popular-stores";
import RecentlyLaunchedStores from "./pages/sections/recent-stores";
import TodaysDeals from "./pages/sections/todays-deals";
import TryItOut from "./pages/sections/try-it-out";

const redirectUrl = `/a/${root}/${routes.root}`;

export const TryItOutSection: PromotedSectionType = {
  id: "try-it-out",
  header: "Try it out",
  description: "Shopping landing page -> Full width banners",
  Component: TryItOut,
  noOfItems: 5,
  Form: TryItOutForm,
  redirectUrl,
};

export const TodaysDealsSection: PromotedSectionType = {
  id: "todays-deals",
  header: "Today's Deals",
  description: "Shopping landing page -> Small cards with offers",
  Component: TodaysDeals,
  noOfItems: 10,
  Form: TodaysDealsForm,
  redirectUrl,
};

export const PopularStoresSection: PromotedSectionType = {
  id: "popular-stores",
  header: "Popular stores",
  description:
    "Homepage, Shopping landing page -> Small cards with store images",
  Component: PopularStores,
  noOfItems: 10,
  Form: PopularStoresForm,
  redirectUrl,
};

export const RecentlyLaunchedSection: PromotedSectionType = {
  id: "recently-launched",
  header: "Recently launched",
  description: "Shopping landing page -> Small cards with store images",
  Component: RecentlyLaunchedStores,
  noOfItems: 10,
  Form: RecentlyLaunchedStoresForm,
  redirectUrl,
};

const promotedSectionsList: PromotedSectionType[] = [
  TryItOutSection,
  TodaysDealsSection,
  PopularStoresSection,
  RecentlyLaunchedSection,
];

export default promotedSectionsList;
