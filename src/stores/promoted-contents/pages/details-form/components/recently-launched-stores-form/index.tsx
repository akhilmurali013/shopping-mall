import React, { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import DetailsForm from "common/components/promoted-content/details-form";
import { root } from "stores/config";
import {
  useGetRecentlyLaunchedStores,
  useGetStoresIdNameMap,
  useUpdateRecentlyLaunchedStores,
} from "stores/promoted-contents/hooks";
import { RecentlyLaunchedSection } from "stores/promoted-contents/promoted-content-sections";
import routes from "stores/promoted-contents/routes";

const RecentlyLaunchedStoresForm: React.FC = () => {
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
      header={RecentlyLaunchedSection?.header}
      description={RecentlyLaunchedSection?.description}
      formItemNos={RecentlyLaunchedSection?.noOfItems}
      selectOptions={storeNameIdMap ?? []}
      values={storeList}
      onSubmit={(values) => {
        mutateAsync(values?.map((v) => ({ id: v }))).then(() =>
          navigate(`/a/${root}/${routes.root}`)
        );
      }}
      onCancelClick={() => navigate(-1)}
    />
  );
};

export default RecentlyLaunchedStoresForm;
