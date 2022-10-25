import { useMutation, useQueryClient } from "react-query";

import { Restaurant } from "app/types/restaurant";
import axiosInstance from "axios-instance";

import { GetRestaurantsQueryId } from "./get-restaurants";

const removeRestaurant = ({ id }: { id: string }) =>
  axiosInstance.delete<Restaurant>(`/restaurants/${id}`);

const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();
  return useMutation(removeRestaurant, {
    onSuccess: () => {
      queryClient.refetchQueries([GetRestaurantsQueryId]);
    },
  });
};

export default useDeleteRestaurant;
