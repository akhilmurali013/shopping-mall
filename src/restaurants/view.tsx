import React from "react";

import { Route, Routes } from "react-router-dom";

import RestaurantDetails from "./pages/add-new";
import ListOfRestaurants from "./pages/list-of-restaurants";
import routes from "./routes";

const Restaurants: React.FC = () => (
  <Routes>
    <Route path={routes.addNew} element={<RestaurantDetails />} />
    <Route path="*" element={<ListOfRestaurants />} />
  </Routes>
);

export default Restaurants;
