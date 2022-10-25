import React, { useMemo } from "react";

import Card from "common/components/promoted-content/card";
import { useGetPromotedOffers } from "stores/promoted-contents/hooks";
import { TodaysDealsSection } from "stores/promoted-contents/promoted-content-sections";

const TodaysDeals: React.FC = () => {
  const { data } = useGetPromotedOffers();

  const values = useMemo(
    () =>
      data?.data?.offers
        ?.slice(0, TodaysDealsSection?.noOfItems)
        ?.slice(0, TodaysDealsSection?.noOfItems)
        .map((item, index) => ({
          position: index + 1,
          value: item?.title,
          id: item?.id,
        })),
    [data]
  );

  return (
    <Card.CardContent
      noOfItemsRequired={TodaysDealsSection?.noOfItems}
      items={values ?? []}
    />
  );
};

export default TodaysDeals;
