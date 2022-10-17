import React from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import ModuleLayout from "common/components/module-layout";
import EventForm from "events/components/events-form";
import { useCreateEvent } from "events/hooks";

const CancelButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Button size="large" onClick={() => navigate(-1)}>
      Cancel
    </Button>
  );
};

const AddNewEvent: React.FC = () => {
  const { create, creating } = useCreateEvent();
  return (
    <ModuleLayout>
      <BreadCrumps pathItems={["Events", "new"]} />
      <EventForm
        formName="Add New Event"
        cancelButton={<CancelButton />}
        submitButtonText="Create"
        onSubmit={create}
        variant="form"
        loading={creating}
      />
    </ModuleLayout>
  );
};

export default AddNewEvent;
