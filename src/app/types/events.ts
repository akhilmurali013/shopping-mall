export enum EventStatus {
  UPCOMING = "UPCOMING",
  RUNNING = "RUNNING",
  GONEPAST = "GONEPAST",
}

export enum EventType {
  ALL_DAY = "ALL_DAY",
  MULTI_DAY = "MULTI_DAY",
  SCHEDULED = "SCHEDULED",
}

export type Event = {
  eventId: string;
  mallId: string;
  name: string;
  status: EventStatus;
  startDate: string | Date;
  endDate: string | Date;
  poster: string;
  banner: string;
  description: string;
  eventType: EventType;
};
