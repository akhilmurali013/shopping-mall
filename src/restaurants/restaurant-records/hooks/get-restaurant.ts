import { useQuery } from "react-query";

import { Restaurant } from "app/types/restaurant";
import axiosInstance from "axios-instance";

const getRestaurant = (id?: string) =>
  axiosInstance.get<Restaurant>(`/restaurants/${id}`);

const useGetRestaurant = (id?: string) =>
  useQuery("get-restaurant", () => getRestaurant(id), { enabled: !!id });

export default useGetRestaurant;
