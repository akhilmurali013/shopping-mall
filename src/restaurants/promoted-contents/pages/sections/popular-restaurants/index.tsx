import React, { useMemo } from "react";

import Card from "common/components/promoted-content/card";
import { useGetPopularRestaurants } from "restaurants/promoted-contents/hooks";
import { PopularRestaurants } from "restaurants/promoted-contents/promoted-content-sections";

const PopularRestaurantsList: React.FC = () => {
  const { data } = useGetPopularRestaurants();

  const values = useMemo(
    () =>
      data?.data?.restaurants
        ?.sort((a, b) => (a?.rank > b?.rank ? 1 : -1))
        ?.slice(0, PopularRestaurants?.noOfItems)
        .map((item, index) => ({
          position: index + 1,
          value: item?.restaurantName,
          id: item?.restaurantId,
        })),
    [data]
  );

  return (
    <Card.CardContent
      noOfItemsRequired={PopularRestaurants?.noOfItems}
      items={values ?? []}
    />
  );
};

export default PopularRestaurantsList;
