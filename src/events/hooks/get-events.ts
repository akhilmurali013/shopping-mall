import { useQuery } from "react-query";

import { EventStatus, EventType } from "app/types/events";
import axiosInstance from "axios-instance";
import { EventFilterType } from "events/pages/event-list";

type EventListFetchType = {
  countInCurrentPage: number;
  totalCount: number;
  eventsList: {
    eventId: string;
    mallId: string;
    name: string;
    status: EventStatus;
    startDate: string;
    endDate: string;
    poster: string;
    banner: string;
    description: string;
    eventType: EventType;
  }[];
};

const getEvents = (filters?: EventFilterType) =>
  axiosInstance.post<EventListFetchType>("/events/_query", {
    name: filters?.query ? filters.query : undefined,
    eventStatuses: filters?.status ? [filters.status] : undefined,
  });

const useGetEvents = (filters?: EventFilterType) =>
  useQuery(["get-events", filters], () => getEvents(filters));

export default useGetEvents;
