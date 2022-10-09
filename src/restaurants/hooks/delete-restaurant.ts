import { useMutation } from "react-query";

import { Restaurant } from "app/types/restaurant";
import axiosInstance from "axios-instance";

const removeRestaurant = ({
  id,
}: {
  id: string;
}): Promise<Restaurant["restaurantId"]> =>
  axiosInstance.delete(`/restaurants/${id}`);

// update the code to clear the cache after delete
const useDeleteRestaurant = () => useMutation(removeRestaurant);

export default useDeleteRestaurant;
