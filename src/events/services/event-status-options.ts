import { EventStatus } from "app/types/events";

export const labelMap = {
  [EventStatus.RUNNING]: "Now Running",
  [EventStatus.UPCOMING]: "Upcoming",
  [EventStatus.GONEPAST]: "Past",
};

export default Object.entries(labelMap).map((label) => ({
  label: label[1],
  value: label[0],
}));
