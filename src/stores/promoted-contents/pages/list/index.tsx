import React, { useMemo, useState } from "react";

import ModuleLayout from "common/components/module-layout";

import SectionFilters from "./components/promoted-content-filter";
import promotedContentSections from "./promoted-content-sections";

// import "./styles.less";

export type SectionFilterType = {
  query?: string;
  section?: string | undefined;
};

const ListOfRestaurants: React.FC = () => {
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
        {filteredSections?.map((Sec) => (
          <Sec.Component
            key={Sec.id}
            id={Sec.id}
            header={Sec.header}
            description={Sec.description}
          />
        ))}
      </ModuleLayout>
    </>
  );
};

export default ListOfRestaurants;
