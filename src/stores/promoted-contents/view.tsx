import React from "react";

import { Route, Routes } from "react-router-dom";

import DetailsView from "common/components/promoted-content/details-view";
import PromotedContentList, {
  promotedContentRoutes,
} from "common/components/promoted-content/promoted-content-list-screen";
import promotedContentSections from "stores/promoted-contents/promoted-content-sections";

const PromotedContents: React.FC = () => (
  <Routes>
    <Route
      path={`${promotedContentRoutes.sectionDetails}/:section/${promotedContentRoutes.edit}`}
      element={
        <DetailsView promotedContentSections={promotedContentSections} />
      }
    />
    <Route
      path="*"
      element={
        <PromotedContentList
          promotedContentSections={promotedContentSections}
        />
      }
    />
  </Routes>
);

export default PromotedContents;
