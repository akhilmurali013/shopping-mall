import { useQuery } from "react-query";

import { FloorInfo } from "app/types";
import { CuisineStyle, DishCategory, DishType } from "app/types/restaurant";
import axiosInstance from "axios-instance";

type GlobalData = {
  dishCategories: {
    dishCategory: DishCategory;
    dishCategoryImageUrl: string;
  }[];
  dishTypes: {
    dishType: DishType;
  };
  cuisineStyles: {
    cuisineStyle: CuisineStyle;
  };
  floorInfo: FloorInfo[];
};

const getFoodGlobalData = (): Promise<GlobalData> =>
  axiosInstance.post("/foodcourt/globaldata");

const useFoodGlobalData = () => {
  const { data, isLoading } = useQuery("get-global-data", getFoodGlobalData);

  return {
    data,
    isLoading,
  };
};

export default useFoodGlobalData;
