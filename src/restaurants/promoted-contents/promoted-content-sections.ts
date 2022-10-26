import { PromotedSectionType } from "common/components/promoted-content/promoted-content-filter";
import { root } from "restaurants/config";
import routes from "restaurants/promoted-contents/routes";

import PopularRestaurantsForm from "./pages/details-form/popular-restaurants-form";
import PopularRestaurantsList from "./pages/sections/popular-restaurants";

const redirectUrl = `/a/${root}/${routes.root}`;

export const HiLiteMallCombos: PromotedSectionType = {
  id: "hi-lite-mall-combos",
  header: "HiLite Mall Combos",
  description: "Food landing page -> Combo cards",
  Component: PopularRestaurantsList,
  noOfItems: 5,
  Form: PopularRestaurantsForm,
  redirectUrl,
};

export const PopularRestaurants: PromotedSectionType = {
  id: "popular-restaurants",
  header: "Popular Restaurants",
  description: "Homepage -> Small cards with restaurant images ",
  Component: PopularRestaurantsList,
  noOfItems: 10,
  Form: PopularRestaurantsForm,
  redirectUrl,
};

const promotedSectionsList: PromotedSectionType[] = [
  HiLiteMallCombos,
  PopularRestaurants,
];

export default promotedSectionsList;
