import React, { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import DetailsForm from "common/components/promoted-content/details-form";
import { PromotedSectionType } from "common/components/promoted-content/promoted-content-filter";
import {
  useGetPopularStores,
  useGetStoresIdNameMap,
  useUpdatePopularStores,
} from "stores/promoted-contents/hooks";

const PopularStoresForm: React.FC<{
  header: PromotedSectionType["header"];
  description: PromotedSectionType["description"];
  noOfItems: PromotedSectionType["noOfItems"];
  redirectUrl: PromotedSectionType["redirectUrl"];
}> = ({ header, description, noOfItems, redirectUrl }) => {
  const navigate = useNavigate();
  const storeNameIdMap = useGetStoresIdNameMap();
  const popularStores = useGetPopularStores();
  const { mutateAsync } = useUpdatePopularStores();

  const storeList = useMemo(
    () => popularStores?.data?.data?.stores?.map((store) => store?.id),
    [popularStores]
  );
  return (
    <DetailsForm
      header={header}
      description={description}
      formItemNos={noOfItems}
      selectOptions={storeNameIdMap ?? []}
      values={storeList}
      onSubmit={(values) => {
        mutateAsync(values?.map((v) => ({ id: v }))).then(() =>
          navigate(redirectUrl)
        );
      }}
      onCancelClick={() => navigate(-1)}
    />
  );
};

export default PopularStoresForm;
