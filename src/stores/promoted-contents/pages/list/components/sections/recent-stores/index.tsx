import React, { useMemo } from "react";

import Card from "common/components/promoted-content/card";
import { useGetRecentlyLaunchedStores } from "stores/promoted-contents/hooks";
import { RecentlyLaunchedSection } from "stores/promoted-contents/promoted-content-sections";

const RecentStoresList: React.FC = () => {
  const { data } = useGetRecentlyLaunchedStores();

  const values = useMemo(
    () =>
      data?.data?.stores
        ?.slice(0, RecentlyLaunchedSection?.noOfItems)
        ?.slice(0, RecentlyLaunchedSection?.noOfItems)
        .map((item, index) => ({
          position: index + 1,
          value: item?.name,
          id: item?.id,
        })),
    [data]
  );

  return (
    <Card.CardContent
      noOfItemsRequired={RecentlyLaunchedSection?.noOfItems}
      items={values ?? []}
    />
  );
};

export default RecentStoresList;
