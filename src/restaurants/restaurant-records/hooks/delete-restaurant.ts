import { useMutation } from "react-query";

import { Restaurant } from "app/types/restaurant";
import axiosInstance from "axios-instance";

const removeRestaurant = ({ id }: { id: string }) =>
  axiosInstance.delete<Restaurant>(`/restaurants/${id}`);

const useDeleteRestaurant = () => useMutation(removeRestaurant);

export default useDeleteRestaurant;
