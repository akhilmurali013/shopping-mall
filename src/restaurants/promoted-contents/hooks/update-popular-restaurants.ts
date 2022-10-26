import { useMutation, useQueryClient } from "react-query";

import axiosInstance from "axios-instance";

import {
  GetPopularRestaurantsQueryId,
  PopularRestaurant,
} from "./get-popular-restaurants";

const updatePopularRestaurants = (popularRestaurants: PopularRestaurant[]) =>
  axiosInstance.post<{
    restaurants: PopularRestaurant[];
  }>("/foodcourt/promoted-restaurants", { restaurants: popularRestaurants });

const useUpdatePopularRestaurants = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePopularRestaurants, {
    onSuccess: () => {
      queryClient.refetchQueries(GetPopularRestaurantsQueryId);
    },
  });
};

export default useUpdatePopularRestaurants;
