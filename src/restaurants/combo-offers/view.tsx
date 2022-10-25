import React from "react";

import { Route, Routes } from "react-router-dom";

import AddComoOffer from "./pages/create-combo";
import EditComoOffer from "./pages/edit-combo";
import ComboOffersList from "./pages/list";
import ViewCombo from "./pages/view-combo";
import routes from "./routes";

const ComboOffersScreen: React.FC = () => (
  <Routes>
    <Route path={routes.addNew} element={<AddComoOffer />} />
    <Route
      path={`${routes.details}/:id/${routes.edit}`}
      element={<EditComoOffer />}
    />
    <Route path={`${routes.details}/:id`} element={<ViewCombo />} />
    <Route path="*" element={<ComboOffersList />} />
  </Routes>
);

export default ComboOffersScreen;
