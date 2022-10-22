import { useMemo } from "react";

import { useGetStores } from "stores/store-records/hooks";

const useGetStoresIdNameMap = () => {
  const { data } = useGetStores();

  const storeNameIdMap = useMemo(
    () =>
      // eslint-disable-next-line no-underscore-dangle
      data?.data?._embedded?.stores?.map((store) => ({
        label: store.name,
        value: store.storeId,
      })),
    [data]
  );

  return storeNameIdMap;
};

export default useGetStoresIdNameMap;
