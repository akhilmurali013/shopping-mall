import React from "react";

import { Route, Routes } from "react-router-dom";

import RestaurantDetails from "./pages/add-new";
import ListOfRestaurants from "./pages/list-of-restaurants";
import ViewRestaurantDetails from "./pages/view-restaurant";
import routes from "./routes";

const Restaurants: React.FC = () => (
  <Routes>
    <Route path={routes.addNew} element={<RestaurantDetails />} />
    <Route
      path={`${routes.details}/:id/${routes.edit}`}
      element={<ViewRestaurantDetails />}
    />
    <Route path={`${routes.details}/:id`} element={<ViewRestaurantDetails />} />
    <Route path="*" element={<ListOfRestaurants />} />
  </Routes>
);

export default Restaurants;
