import { useMemo } from "react";

import { useGetRestaurants } from "restaurants/restaurant-records/hooks";

const useGetRestaurantNameIdMap = () => {
  const { data } = useGetRestaurants();

  const restaurantNameIdMap = useMemo(
    () =>
      data?.data?.restaurants?.map((restaurant) => ({
        label: restaurant?.restaurantName,
        value: restaurant?.restaurantId,
      })),
    [data]
  );

  return restaurantNameIdMap;
};

export default useGetRestaurantNameIdMap;
