import React from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import ModuleLayout from "common/components/module-layout";
import EventForm from "events/components/events-form";

const CancelButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Button size="large" onClick={() => navigate(-1)}>
      Cancel
    </Button>
  );
};

// eslint-disable-next-line arrow-body-style
const AddNewEvent: React.FC = () => {
  return (
    <ModuleLayout>
      <BreadCrumps pathItems={["Events", "new"]} />
      <EventForm
        formName="Add New Event"
        cancelButton={<CancelButton />}
        submitButtonText="Create"
        // onSubmit={console.log}
        variant="form"
      />
    </ModuleLayout>
  );
};

export default AddNewEvent;
