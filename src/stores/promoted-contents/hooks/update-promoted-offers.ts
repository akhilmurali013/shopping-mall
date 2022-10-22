import { useMutation, useQueryClient } from "react-query";

import axiosInstance from "axios-instance";

import {
  GetPromotedOffersQueryId,
  PromotedOffers,
} from "./get-promoted-offers";

type IdListType = { id: string };

const updatePromotedOffers = (offerIds: IdListType[]) =>
  axiosInstance.put<{
    offers: PromotedOffers[];
  }>("/promoted-content/offers", { offers: offerIds });

const useUpdatePromotedOffers = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePromotedOffers, {
    onSuccess: () => {
      queryClient.refetchQueries(GetPromotedOffersQueryId);
    },
  });
};

export default useUpdatePromotedOffers;
