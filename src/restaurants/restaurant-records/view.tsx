import React from "react";

import { Route, Routes } from "react-router-dom";

import AddNewRestaurant from "./pages/add-new";
import ListOfRestaurants from "./pages/list-of-restaurants";
import UpdateRestaurantDetails from "./pages/update-restaurant";
import ViewRestaurantDetails from "./pages/view-restaurant";
import routes from "./routes";

const Restaurants: React.FC = () => (
  <Routes>
    <Route path={routes.addNew} element={<AddNewRestaurant />} />
    <Route
      path={`${routes.details}/:id/${routes.edit}`}
      element={<UpdateRestaurantDetails />}
    />
    <Route path={`${routes.details}/:id`} element={<ViewRestaurantDetails />} />
    <Route path="*" element={<ListOfRestaurants />} />
  </Routes>
);

export default Restaurants;
