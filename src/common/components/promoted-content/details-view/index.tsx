import React, { useMemo } from "react";

import { useParams } from "react-router-dom";

import { PromotedSectionType } from "../promoted-content-filter";

const DetailsForm: React.FC<{
  promotedContentSections: PromotedSectionType[];
}> = ({ promotedContentSections }) => {
  const { section } = useParams();
  const SectionInfo = useMemo(() => {
    if (section)
      return promotedContentSections?.find((sec) => sec.id === section);
    return undefined;
  }, [section]);

  if (SectionInfo?.Form)
    return (
      <SectionInfo.Form
        header={SectionInfo.header}
        description={SectionInfo.description}
        noOfItems={SectionInfo.noOfItems}
        redirectUrl={SectionInfo.redirectUrl}
      />
    );
  return null;
};

export default DetailsForm;
