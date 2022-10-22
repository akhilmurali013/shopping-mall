import React, { useMemo } from "react";

import Card from "common/components/promoted-content/card";
import { useGetPromotedBanners } from "stores/promoted-contents/hooks";
import { mockPromotedBanners } from "stores/promoted-contents/hooks/get-promoted-banners";
import { TryItOutSection } from "stores/promoted-contents/promoted-content-sections";

const TryItOut: React.FC = () => {
  const { data } = useGetPromotedBanners();

  const values = useMemo(
    () =>
      // data?.data?.offers?.slice(0, TryItOutSection?.noOfItems)
      mockPromotedBanners
        ?.slice(0, TryItOutSection?.noOfItems)
        .map((item, index) => ({
          position: index + 1,
          value: item?.title,
          id: item?.id,
        })),
    [data]
  );

  return (
    <Card.CardContent
      noOfItemsRequired={TryItOutSection?.noOfItems}
      items={values}
    />
  );
};

export default TryItOut;
