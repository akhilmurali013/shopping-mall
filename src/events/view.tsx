import React from "react";

import { Route, Routes } from "react-router-dom";

import AddNew from "./pages/add-new";
// import EditStoreDetails from "./pages/edit";
import EventList from "./pages/event-list";
// import Details from "./pages/view-store";
// import routes from "./routes";
import routes from "./routes";

const Restaurants: React.FC = () => (
  <Routes>
    <Route path={routes.addNew} element={<AddNew />} />
    {/* <Route path={`${routes.details}/:id`} element={<Details />} />
    <Route
      path={`${routes.details}/:id/${routes.edit}`}
      element={<EditStoreDetails />}
    /> */}
    <Route path="*" element={<EventList />} />
  </Routes>
);

export default Restaurants;
