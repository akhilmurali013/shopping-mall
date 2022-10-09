import { useEffect, useState } from "react";

import { useQuery } from "react-query";

import {
  CuisineStyle,
  CuisineType,
  DishCategory,
  DishType,
  FloorInfo,
} from "app/types";
import axiosInstance from "axios-instance";

type GlobalData = {
  dishCategories: DishCategory[];
  dishTypes: DishType[];
  cuisineStyles: CuisineStyle[];
  cuisineTypes: CuisineType[];
  floorInfo: FloorInfo[];
};

type mappedGlobalDataType = {
  dishCategories?: { [key: string]: DishCategory };
  dishTypes?: { [key: string]: DishType };
  cuisineStyles?: { [key: string]: CuisineStyle };
  cuisineTypes?: { [key: string]: CuisineType };
  floorInfo?: { [key: string]: FloorInfo };
};

const getFoodGlobalData = (): Promise<GlobalData> =>
  axiosInstance.post("/foodcourt/globaldata");

const useFoodGlobalData = () => {
  const [mappedData, setMappedData] = useState<mappedGlobalDataType>({
    dishCategories: {},
    dishTypes: {},
    cuisineStyles: {},
    cuisineTypes: {},
    floorInfo: {},
  });
  const { data, isLoading } = useQuery("get-global-data", getFoodGlobalData);

  useEffect(() => {
    setMappedData({
      dishCategories: data?.dishCategories?.reduce((acc, category) => {
        acc[category.dishCategoryId] = category;
        return acc;
      }, {} as { [key: string]: DishCategory }),
      dishTypes: data?.dishTypes?.reduce((acc, dishType) => {
        acc[dishType.dishTypeId] = dishType;
        return acc;
      }, {} as { [key: string]: DishType }),
      cuisineStyles: data?.cuisineStyles?.reduce((acc, cuisineStyle) => {
        acc[cuisineStyle.cuisineStyleId] = cuisineStyle;
        return acc;
      }, {} as { [key: string]: CuisineStyle }),
      cuisineTypes: data?.cuisineTypes?.reduce((acc, cuisineType) => {
        acc[cuisineType.cuisineTypeId] = cuisineType;
        return acc;
      }, {} as { [key: string]: CuisineType }),
      floorInfo: data?.floorInfo?.reduce((acc, floor) => {
        acc[floor.floorId] = floor;
        return acc;
      }, {} as { [key: string]: FloorInfo }),
    });
  }, [data]);

  return {
    data,
    mappedData,
    isLoading,
  };
};

export default useFoodGlobalData;
