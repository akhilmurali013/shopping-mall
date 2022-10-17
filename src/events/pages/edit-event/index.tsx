import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import Loader from "common/components/loader";
import ModuleLayout from "common/components/module-layout";
import EventForm from "events/components/events-form";
import { useCreateEvent, useGetEvent } from "events/hooks";
import mapToEventForm from "events/services/map-to-event-form";

const CancelButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Button size="large" onClick={() => navigate(-1)}>
      Cancel
    </Button>
  );
};

const ViewEvent: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEvent(id);
  const { update, updating } = useCreateEvent();

  const event = data?.data;

  return (
    <ModuleLayout>
      <BreadCrumps pathItems={["Events", "edit"]} />
      {isLoading && <Loader />}
      {event && (
        <EventForm
          formName={event?.name ?? ""}
          defaultValues={mapToEventForm(event)}
          cancelButton={<CancelButton />}
          submitButtonText="Save details"
          onSubmit={(v) => update({ id: id as string, event: v })}
          variant="form"
          loading={updating}
        />
      )}
    </ModuleLayout>
  );
};

export default ViewEvent;
