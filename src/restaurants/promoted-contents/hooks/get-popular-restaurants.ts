import { useQuery } from "react-query";

import axiosInstance from "axios-instance";

export const GetPopularRestaurantsQueryId = "get-popular-restaurants";

export type PopularRestaurant = {
  restaurantId: string;
  restaurantName: string;
  rank: number;
};

const getPopularRestaurants = () =>
  axiosInstance.get<{
    restaurants: PopularRestaurant[];
  }>("/foodcourt/promoted-restaurants");

const useGetPopularRestaurants = () =>
  useQuery([GetPopularRestaurantsQueryId], getPopularRestaurants);

export default useGetPopularRestaurants;
