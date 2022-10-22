import React, { useMemo } from "react";

import Card from "common/components/promoted-content/card";
import { useGetPopularStores } from "stores/promoted-contents/hooks";
import { mockPopularStores } from "stores/promoted-contents/hooks/get-popular-stores";
import { PopularStoresSection } from "stores/promoted-contents/promoted-content-sections";

const PopularStoresList: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useGetPopularStores();

  const values = useMemo(
    () =>
      // const items = data?.data?.stores?.slice(0, PopularStoresSection?.noOfItems);
      mockPopularStores
        ?.slice(0, PopularStoresSection?.noOfItems)
        .map((item, index) => ({
          position: index + 1,
          value: item?.name,
          id: item?.id,
        })),
    [data]
  );

  return (
    <Card.CardContent
      noOfItemsRequired={PopularStoresSection?.noOfItems}
      items={values}
    />
  );
};

export default PopularStoresList;
