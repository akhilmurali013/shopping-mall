import React, { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import DetailsForm from "common/components/promoted-content/details-form";
import { PromotedSectionType } from "common/components/promoted-content/promoted-content-filter";
import {
  useGetPopularRestaurants,
  useGetRestaurantNameIdMap,
  useUpdatePopularRestaurants,
} from "restaurants/promoted-contents/hooks";

const PopularRestaurantsForm: React.FC<{
  header: PromotedSectionType["header"];
  description: PromotedSectionType["description"];
  noOfItems: PromotedSectionType["noOfItems"];
  redirectUrl: PromotedSectionType["redirectUrl"];
}> = ({ header, description, noOfItems, redirectUrl }) => {
  const navigate = useNavigate();
  const restaurantNameIdMap = useGetRestaurantNameIdMap();
  const popularRestaurants = useGetPopularRestaurants();
  const { mutateAsync } = useUpdatePopularRestaurants();

  const restaurantList = useMemo(
    () =>
      popularRestaurants?.data?.data?.restaurants?.map(
        (restaurant) => restaurant?.restaurantId
      ),
    [popularRestaurants]
  );

  const idMap = useMemo(
    () =>
      restaurantNameIdMap?.reduce((acc, item) => {
        acc[item.value] = item;
        return acc;
      }, {} as Record<string, { value: string; label: string }>),
    [restaurantNameIdMap]
  );

  const updatePopularRestaurants = (values: string[]) => {
    mutateAsync(
      values
        ?.filter((v) => !!v)
        ?.map((v, index) => ({
          restaurantId: v,
          restaurantName: idMap?.[v]?.label ?? "",
          rank: index + 1,
        }))
    ).then(() => navigate(redirectUrl));
  };

  return (
    <DetailsForm
      header={header}
      description={description}
      formItemNos={noOfItems}
      selectOptions={restaurantNameIdMap ?? []}
      values={restaurantList}
      onSubmit={updatePopularRestaurants}
      onCancelClick={() => navigate(-1)}
    />
  );
};

export default PopularRestaurantsForm;
