import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Image } from "antd";
import format from "date-fns/format";

import { Event, EventStatus, EventType } from "app/types/events";
import Icon from "common/components/icon";
import ModuleLayout from "common/components/module-layout";
import Table from "common/components/table";
import EventDeleteModal from "events/components/event-delete-modal";
import EventStatusPill from "events/components/status-pill";
import { useDeleteEvent, useGetEvents } from "events/hooks";
import routes from "events/routes";

import EventFilters from "./components/event-filters";

export type EventFilterType = {
  query?: string;
  status?: EventStatus | undefined;
};

const columns = [
  {
    title: "Event name",
    dataIndex: "eventName",
    key: "eventName",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

const getEventDate = ({
  eventType,
  startDate,
  endDate,
}: {
  eventType: EventType;
  startDate: string;
  endDate: string;
}) => {
  if (eventType === EventType.ALL_DAY || startDate === endDate) {
    return format(new Date(startDate), "dd/MM/yyyy");
  }
  return `${format(new Date(startDate), "dd/MM/yyyy")} - ${format(
    new Date(endDate),
    "dd/MM/yyyy"
  )}`;
};

const getEventTime = ({
  eventType,
  startDate,
  endDate,
}: {
  eventType: EventType;
  startDate: string;
  endDate: string;
}) => {
  if (eventType === EventType.ALL_DAY || startDate === endDate) {
    return format(new Date(startDate), "h:mm aaa");
  }
  return `${format(new Date(startDate), "h:mm aaa")} - ${format(
    new Date(endDate),
    "h:mm aaa"
  )}`;
};

const EventList: React.FC = () => {
  const navigate = useNavigate();
  const [eventFilters, setEventChanges] = useState<EventFilterType>();
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const { mutateAsync, isLoading } = useDeleteEvent();

  const { data } = useGetEvents(eventFilters);

  const dataSource = useMemo(
    () =>
      data?.data?.eventsList?.map((event) => ({
        eventName: (
          <div>
            <Image height="40px" width="40px" src={event?.poster} />
            &nbsp;
            {event?.name}
          </div>
        ),
        date: getEventDate({
          eventType: event.eventType,
          startDate: event?.startDate,
          endDate: event?.endDate,
        }),
        time: getEventTime({
          eventType: event.eventType,
          startDate: event?.startDate,
          endDate: event?.endDate,
        }),
        status: <EventStatusPill eventStatus={event?.status} />,
        actions: (
          <div className="table-actions-cell">
            <button
              type="button"
              className="action-button"
              onClick={() => navigate(`${routes.details}/${event.eventId}`)}
            >
              <Icon name="view" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedEvent(event)}
              className="action-button"
            >
              <Icon name="bin" />
            </button>
            {event?.status !== EventStatus.GONEPAST && (
              <button
                type="button"
                className="action-button"
                onClick={() =>
                  navigate(`${routes.details}/${event.eventId}/${routes.edit}`)
                }
              >
                <Icon name="pencil" />
              </button>
            )}
          </div>
        ),
      })),
    [data]
  );

  return (
    <div>
      <ModuleLayout>
        <ModuleLayout.Header header="Events">
          <Button
            size="large"
            icon={<Icon name="plus" style={{ marginRight: "10px" }} />}
            onClick={() => navigate(routes.addNew)}
          >
            Add new event
          </Button>
        </ModuleLayout.Header>
        <EventFilters filters={eventFilters} setFilters={setEventChanges} />
        <Table columns={columns} dataSource={dataSource} />
      </ModuleLayout>
      {selectedEvent?.eventId && (
        <EventDeleteModal
          eventName={selectedEvent?.name}
          onClose={() => setSelectedEvent(undefined)}
          onDelete={() =>
            mutateAsync({ id: selectedEvent?.eventId }).then(() =>
              setSelectedEvent(undefined)
            )
          }
          loading={isLoading}
        />
      )}
    </div>
  );
};

export default EventList;
