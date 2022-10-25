import { useQuery } from "react-query";

import {
  AddOnGroup,
  CuisineStyle,
  CuisineType,
  DishCategory,
  DishType,
  DishVariantGroup,
} from "app/types/restaurant";
import axiosInstance from "axios-instance";

const GetRestaurantDishesQueryId = "get-restaurant-dishes";

const getRestaurantDishes = (restaurantId?: string) =>
  axiosInstance.post<{
    dishes: {
      dishId: string;
      restaurantId: string;
      dishName: string;
      dishType: DishType;
      dishCategory: DishCategory;
      cuisineType: CuisineType;
      cuisineStyle: CuisineStyle;
      price: number;
      description: string;
      bestSeller: boolean;
      inStock: boolean;
      rating: number;
      numberOfRatings: number;
      dishImageUrl: string;
      addOnGroups: AddOnGroup[];
      dishVariantGroups: DishVariantGroup[];
    }[];
  }>("/dishes/_query", { restaurantId });

const useGetRestaurantDishes = (restaurantId?: string) =>
  useQuery(
    [GetRestaurantDishesQueryId, restaurantId],
    () => getRestaurantDishes(restaurantId),
    { enabled: !!restaurantId }
  );

export default useGetRestaurantDishes;
