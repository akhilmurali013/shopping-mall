import React from "react";

import { EventStatus } from "app/types/events";
import Pill, { PillType } from "common/components/pills";
import { labelMap } from "events/services/event-status-options";

const eventTypeMap = {
  [EventStatus.RUNNING]: PillType.SUCCESS,
  [EventStatus.UPCOMING]: PillType.PRIMARY,
  [EventStatus.GONEPAST]: PillType.ERROR,
};

const EventStatusPill: React.FC<{
  eventStatus: EventStatus;
}> = ({ eventStatus }) => (
  <Pill type={eventTypeMap[eventStatus]} text={labelMap[eventStatus]} />
);

export default EventStatusPill;
