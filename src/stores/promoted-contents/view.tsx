import React from "react";

import { Route, Routes } from "react-router-dom";

import DetailsForm from "stores/promoted-contents/pages/details-form";
import PromotedContentList from "stores/promoted-contents/pages/list";

import routes from "./routes";

const PromotedContents: React.FC = () => (
  <Routes>
    <Route
      path={`${routes.sectionDetails}/:section/${routes.edit}`}
      element={<DetailsForm />}
    />
    <Route path="*" element={<PromotedContentList />} />
  </Routes>
);

export default PromotedContents;
