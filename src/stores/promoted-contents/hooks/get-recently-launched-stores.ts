import { useQuery } from "react-query";

import axiosInstance from "axios-instance";

export const GetRecentlyLaunchedStoresQueryId = "get-recently-stores";

const mockRecentStore = (id: string, name: string): RecentStores => ({
  id,
  name,
  brandLogoUrl: "",
  storeImageUrl: "",
  location: {
    floorId: 1,
    name: "",
  },
});

export const mockRecentStores = [
  mockRecentStore("1", "Addidas"),
  mockRecentStore("2", "Nike"),
  mockRecentStore("3", "Allen Solly"),
  mockRecentStore("4", "Peter England"),
  mockRecentStore("5", "Reebok"),
  mockRecentStore("6", "Puma"),
  mockRecentStore("7", "Paris Hilton"),
  mockRecentStore("8", "Chanel"),
  mockRecentStore("9", "Tata"),
  mockRecentStore("10", "Chroma"),
  mockRecentStore("11", "dchdsbc"),
  mockRecentStore("12", "cskjd cks d"),
  mockRecentStore("13", "sdcsdc sdcsd"),
  mockRecentStore("14", "sdcsdc qwqw"),
  mockRecentStore("15", "kajskxaj asjx"),
  mockRecentStore("16", "anxjnsx xnajas"),
];

type RecentStores = {
  id: string;
  name: string;
  brandLogoUrl: string;
  storeImageUrl: string;
  location: {
    floorId: number;
    name: string;
  };
};

const getRecentlyLaunchedStores = () =>
  axiosInstance.get<{
    stores: RecentStores[];
  }>("/promoted-content/recently-launched-stores");

const useGetRecentlyLaunchedStores = () =>
  useQuery([GetRecentlyLaunchedStoresQueryId], getRecentlyLaunchedStores);

export default useGetRecentlyLaunchedStores;
