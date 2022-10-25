import React, { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import DetailsForm from "common/components/promoted-content/details-form";
import { PromotedSectionType } from "common/components/promoted-content/promoted-content-filter";
import {
  useGetRecentlyLaunchedStores,
  useGetStoresIdNameMap,
  useUpdateRecentlyLaunchedStores,
} from "stores/promoted-contents/hooks";

const RecentlyLaunchedStoresForm: React.FC<{
  header: PromotedSectionType["header"];
  description: PromotedSectionType["description"];
  noOfItems: PromotedSectionType["noOfItems"];
  redirectUrl: PromotedSectionType["redirectUrl"];
}> = ({ header, description, noOfItems, redirectUrl }) => {
  const navigate = useNavigate();
  const storeNameIdMap = useGetStoresIdNameMap();
  const recentStores = useGetRecentlyLaunchedStores();
  const { mutateAsync } = useUpdateRecentlyLaunchedStores();

  const storeList = useMemo(
    () => recentStores?.data?.data?.stores?.map((store) => store?.id),
    [recentStores]
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

export default RecentlyLaunchedStoresForm;
