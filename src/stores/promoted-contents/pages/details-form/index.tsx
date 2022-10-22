import React, { useMemo } from "react";

import { useParams } from "react-router-dom";

import promotedSectionsList from "stores/promoted-contents/promoted-content-sections";

const DetailsForm: React.FC = () => {
  const { section } = useParams();
  const SectionInfo = useMemo(() => {
    if (section) return promotedSectionsList?.find((sec) => sec.id === section);
    return undefined;
  }, [section]);

  if (SectionInfo?.Form) return <SectionInfo.Form />;
  return null;
};

export default DetailsForm;
