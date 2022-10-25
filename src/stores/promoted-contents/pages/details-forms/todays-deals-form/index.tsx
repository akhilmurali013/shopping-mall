import React, { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import DetailsForm from "common/components/promoted-content/details-form";
import { PromotedSectionType } from "common/components/promoted-content/promoted-content-filter";
import {
  useGetOffersIdNameMap,
  useGetPromotedOffers,
  useUpdatePromotedOffers,
} from "stores/promoted-contents/hooks";

const TodaysDealsForm: React.FC<{
  header: PromotedSectionType["header"];
  description: PromotedSectionType["description"];
  noOfItems: PromotedSectionType["noOfItems"];
  redirectUrl: PromotedSectionType["redirectUrl"];
}> = ({ header, description, noOfItems, redirectUrl }) => {
  const navigate = useNavigate();
  const offerIdNameMap = useGetOffersIdNameMap();
  const promotedOffers = useGetPromotedOffers();
  const { mutateAsync } = useUpdatePromotedOffers();

  const offersList = useMemo(
    () => promotedOffers?.data?.data?.offers?.map((offer) => offer?.id),
    [promotedOffers]
  );
  return (
    <DetailsForm
      header={header}
      description={description}
      formItemNos={noOfItems}
      selectOptions={offerIdNameMap ?? []}
      values={offersList}
      onSubmit={(values) => {
        mutateAsync(values?.map((v) => ({ id: v }))).then(() =>
          navigate(redirectUrl)
        );
      }}
      onCancelClick={() => navigate(-1)}
    />
  );
};

export default TodaysDealsForm;
