import { useMutation, useQueryClient } from "react-query";

import axiosInstance from "axios-instance";

import { GetEventsQueryId } from "./get-events";

const removeEvent = ({ id }: { id: string }): Promise<{ id: string }> =>
  axiosInstance.delete(`/events/${id}`);

const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(removeEvent, {
    onSuccess: () => {
      queryClient.refetchQueries(GetEventsQueryId);
    },
  });
};

export default useDeleteEvent;
