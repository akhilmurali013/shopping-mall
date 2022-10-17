import moment from "moment";

import { Event, EventType } from "app/types/events";
import { EventFormValues } from "events/components/events-form";

export default (v: Event): EventFormValues => ({
  eventType: v.eventType,
  name: v.name,
  description: v.description,
  date: {
    startDate: moment(new Date(v.startDate), "dd/MM/yyyy"),
    endDate: v.endDate ? moment(new Date(v.endDate), "dd/MM/yyyy") : undefined,
  },
  time:
    v.eventType !== EventType.SCHEDULED
      ? undefined
      : {
          startTime: moment(new Date(v.startDate)).format("HH:mm"),
          endTime: moment(new Date(v.endDate)).format("HH:mm"),
        },
  poster: {
    url: v.poster,
  },
  banner: {
    url: v.banner,
  },
});
