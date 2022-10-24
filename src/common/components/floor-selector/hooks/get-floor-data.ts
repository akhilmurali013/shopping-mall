import { useQuery } from "react-query";

import axiosInstance from "axios-instance";

const getFloorData = () =>
  axiosInstance.get<{ id: number; name: string }[]>("/shopping-malls/1/floors");

const useGetFloorInfo = () =>
  useQuery(["get-floor-info"], () => getFloorData());

export default useGetFloorInfo;
