import { useMutation, useQueryClient } from "react-query";

import axiosInstance from "axios-instance";

const removeEvent = ({ id }: { id: string }): Promise<{ id: string }> =>
  axiosInstance.delete(`/events/${id}`);

// update the code to clear the cache after delete
const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(removeEvent, {
    onSuccess: () => {
      queryClient.refetchQueries("get-events");
    },
  });
};

export default useDeleteEvent;
