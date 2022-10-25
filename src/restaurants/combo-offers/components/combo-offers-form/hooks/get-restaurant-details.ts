import { useMemo } from "react";

import { DishVariant } from "app/types/restaurant";
import { useGetRestaurantDishes } from "restaurants/combo-offers/hooks";

const useGetRestaurantDishDetails = (id: string) => {
  const { data } = useGetRestaurantDishes(id);

  const restaurantDishIdNameMap = useMemo(
    () =>
      data?.data?.dishes?.map((dish) => ({
        label: dish?.dishName,
        value: dish?.dishId,
      })),
    [data]
  );

  const dishVariantMap = useMemo(
    () =>
      data?.data?.dishes?.reduce((acc, dish) => {
        if (dish?.dishId) {
          acc[dish.dishId] = dish.dishVariantGroups
            ?.map((variantGroup) => variantGroup.dishVariants ?? [])
            ?.flat();
        }
        return acc;
      }, {} as { [key: string]: DishVariant[] }) ?? {},
    [data]
  );

  const variantIdMap = useMemo(
    () =>
      Object.values(dishVariantMap)
        ?.flat()
        ?.reduce((acc, variant) => {
          if (variant?.dishVariantId) {
            acc[variant?.dishVariantId] = variant;
          }
          return acc;
        }, {} as { [key: string]: DishVariant }),
    [dishVariantMap]
  );

  return {
    restaurantDishIdNameMap,
    dishVariantMap,
    variantIdMap,
  };
};

export default useGetRestaurantDishDetails;
