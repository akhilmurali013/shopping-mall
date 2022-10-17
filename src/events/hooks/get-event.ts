import { useQuery } from "react-query";

import { Event } from "app/types/events";
import axiosInstance from "axios-instance";

const getEvent = (eventId?: string) =>
  axiosInstance.get<Event>(`/events/${eventId}`);

const useGetEvent = (id?: string) =>
  useQuery(["get-event", id], () => getEvent(id));

export default useGetEvent;
