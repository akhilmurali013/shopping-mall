import { useQuery } from "react-query";

import axiosInstance from "axios-instance";

export const GetPopularStoresQueryId = "get-popular-stores";

const mockPopularStore = (id: string, name: string): PopularStores => ({
  id,
  name,
  brandLogoUrl: "",
  storeImageUrl: "",
  location: {
    floorId: 1,
    name: "",
  },
});

export const mockPopularStores = [
  mockPopularStore("1", "Addidas"),
  mockPopularStore("2", "Nike"),
  mockPopularStore("3", "Allen Solly"),
  mockPopularStore("4", "Peter England"),
  mockPopularStore("5", "Reebok"),
  // mockPopularStore('6', 'Puma'),
  // mockPopularStore('7', 'Paris Hilton'),
  // mockPopularStore('8', 'Chanel'),
  // mockPopularStore('9', 'Tata'),
  // mockPopularStore('10', 'Chroma'),
  // mockPopularStore('11', 'dchdsbc'),
  // mockPopularStore('12', 'cskjd cks d'),
  // mockPopularStore('13', 'sdcsdc sdcsd'),
  // mockPopularStore('14', 'sdcsdc qwqw'),
  // mockPopularStore('15', 'kajskxaj asjx'),
  // mockPopularStore('16', 'anxjnsx xnajas'),
];

type PopularStores = {
  id: string;
  name: string;
  brandLogoUrl: string;
  storeImageUrl: string;
  location: {
    floorId: number;
    name: string;
  };
};

const getPopularStores = () =>
  axiosInstance.get<{
    stores: PopularStores[];
  }>("/promoted-content/popular-stores");

const useGetPopularStores = () =>
  useQuery([GetPopularStoresQueryId], getPopularStores);

export default useGetPopularStores;
