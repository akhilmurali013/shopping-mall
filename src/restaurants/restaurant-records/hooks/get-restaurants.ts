import { useQuery } from "react-query";

import { Restaurant } from "app/types/restaurant";
import axiosInstance from "axios-instance";
import { RestaurantFilterType } from "restaurants/restaurant-records/pages/list-of-restaurants";

const getRestaurants = (filters?: RestaurantFilterType) =>
  axiosInstance.post<{ restaurants: Restaurant[] }>("/restaurants/_query", {
    restaurantName: filters?.query ?? "",
    dishCategory: filters?.category ?? undefined,
  });

const useGetRestaurants = (filters?: RestaurantFilterType) =>
  useQuery(["get-restaurants", filters], () => getRestaurants(filters));

export default useGetRestaurants;
