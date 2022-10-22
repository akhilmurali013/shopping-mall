import React, { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import DetailsForm from "common/components/promoted-content/details-form";
import { root } from "stores/config";
import {
  useGetOffersIdNameMap,
  useGetPromotedOffers,
  useUpdatePromotedOffers,
} from "stores/promoted-contents/hooks";
import { TodaysDealsSection } from "stores/promoted-contents/promoted-content-sections";
import routes from "stores/promoted-contents/routes";

const TodaysDealsForm: React.FC = () => {
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
      header={TodaysDealsSection?.header}
      description={TodaysDealsSection?.description}
      formItemNos={TodaysDealsSection?.noOfItems}
      selectOptions={offerIdNameMap ?? []}
      values={offersList}
      onSubmit={(values) => {
        mutateAsync(values?.map((v) => ({ id: v }))).then(() =>
          navigate(`/a/${root}/${routes.root}`)
        );
      }}
      onCancelClick={() => navigate(-1)}
    />
  );
};

export default TodaysDealsForm;
