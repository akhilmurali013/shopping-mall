import React, { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import DetailsForm from "common/components/promoted-content/details-form";
import { root } from "stores/config";
import {
  useGetPopularStores,
  useGetStoresIdNameMap,
  useUpdatePopularStores,
} from "stores/promoted-contents/hooks";
import { PopularStoresSection } from "stores/promoted-contents/promoted-content-sections";
import routes from "stores/promoted-contents/routes";

const PopularStoresForm: React.FC = () => {
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
      header={PopularStoresSection?.header}
      description={PopularStoresSection?.description}
      formItemNos={PopularStoresSection?.noOfItems}
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

export default PopularStoresForm;
