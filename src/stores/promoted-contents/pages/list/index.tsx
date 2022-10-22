/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import ModuleLayout from "common/components/module-layout";
import Card from "common/components/promoted-content/card";
import promotedContentRoutes from "stores/promoted-contents/routes";

import promotedContentSections from "../../promoted-content-sections";
import SectionFilters from "./components/promoted-content-filter";

export type SectionFilterType = {
  query?: string;
  section?: string | undefined;
};

const ListOfRestaurants: React.FC = () => {
  const navigate = useNavigate();
  const [sectionFilters, setFilterChanges] = useState<SectionFilterType>();

  const filteredSections = useMemo(() => {
    if (sectionFilters?.section) {
      return promotedContentSections?.filter(
        (sec) => sec.id === sectionFilters.section
      );
    }
    if (sectionFilters?.query) {
      return promotedContentSections?.filter((sec) =>
        sec.header
          .toLowerCase()
          ?.includes(sectionFilters?.query?.toLocaleLowerCase() ?? "")
      );
    }
    return promotedContentSections;
  }, [sectionFilters]);

  return (
    <>
      <ModuleLayout>
        <ModuleLayout.Header header="Promoted content" />
        <SectionFilters
          filters={sectionFilters}
          setFilters={setFilterChanges}
        />
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

export default ListOfRestaurants;
