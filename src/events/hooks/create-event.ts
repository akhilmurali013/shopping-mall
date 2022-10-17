import { useMutation } from "react-query";

import moment, { Moment } from "moment";

import { Event, EventType } from "app/types/events";
import axiosInstance from "axios-instance";
import { EventFormValues } from "events/components/events-form";

type EventCreateType = {
  name: string;
  startDate?: Date;
  endDate?: Date;
  description: string;
  eventType: EventType;
};

const createDateTime = (date: Moment, time?: string) => {
  const d = moment(date).startOf("day");
  if (time) {
    const [hour, minute] = time.split(":").map((v) => Number(v));
    d.set("hour", hour);
    d.set("minute", minute);
  }
  return d.toDate();
};

const mapFormDataToEventCreationType = (
  v: EventFormValues
): EventCreateType => ({
  name: v.name,
  startDate: v?.date?.startDate
    ? createDateTime(v?.date?.startDate, v?.time?.startTime)
    : undefined,
  endDate: v?.date?.endDate
    ? createDateTime(v?.date?.endDate, v?.time?.endTime)
    : undefined,
  description: v.description,
  eventType: v.eventType,
});

const config = {
  headers: { "content-type": "multipart/form-data" },
};

const getFormData = (event: EventFormValues) => {
  const formData = new FormData();
  Object.entries(mapFormDataToEventCreationType(event)).forEach((item) => {
    formData.append(item[0], item[1] as string);
  });
  if (event?.banner?.blob) {
    formData.append("banner", event.banner.blob);
  }
  if (event?.poster?.blob) {
    formData.append("poster", event.poster.blob);
  }
  return formData;
};

const createEvent = (event: EventFormValues) => {
  const formData = getFormData(event);
  return axiosInstance.post<Event>(`/events`, formData, config);
};

const updateEvent = ({ id, event }: { id: string; event: EventFormValues }) => {
  const formData = getFormData(event);
  return axiosInstance.put<Event>(`/events/${id}`, formData, config);
};

const useCreateEvent = () => {
  const { mutate: create, isLoading: creating } = useMutation(createEvent);
  const { mutate: update, isLoading: updating } = useMutation(updateEvent);

  return {
    create,
    creating,
    update,
    updating,
  };
};

export default useCreateEvent;
