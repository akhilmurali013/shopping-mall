import React from "react";

import { useNavigate } from "react-router-dom";

import ModuleLayout from "common/components/module-layout";
import Card from "common/components/promoted-content/card";

import usePromotedContentFilter, {
  PromotedSectionType,
} from "../promoted-content-filter";

export const promotedContentRoutes = {
  root: "promoted-contents",
  sectionDetails: "section-details",
  edit: "edit",
};

const PromotedContentListScreen: React.FC<{
  promotedContentSections: PromotedSectionType[];
  header?: string;
}> = ({ promotedContentSections, header = "Promoted content" }) => {
  const navigate = useNavigate();

  const { FilterForm, filteredSections } = usePromotedContentFilter(
    promotedContentSections
  );

  return (
    <>
      <ModuleLayout>
        <ModuleLayout.Header header={header} />
        {FilterForm}
        <div>
          {filteredSections?.map((Sec) => (
            <Card
              key={Sec.id}
              onEditClick={() =>
                navigate(
                  `${promotedContentRoutes.sectionDetails}/${Sec.id}/${promotedContentRoutes.edit}`
                )
              }
              header={Sec.header}
              description={Sec.description}
            >
              <Sec.Component />
            </Card>
          ))}
        </div>
      </ModuleLayout>
    </>
  );
};

export default PromotedContentListScreen;
