import React from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import ModuleLayout from "common/components/module-layout";
import StoreForm from "stores/store-records/components/store-form";
import { useCreateStore } from "stores/store-records/hooks";

const CancelButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Button size="large" onClick={() => navigate(-1)}>
      Cancel
    </Button>
  );
};

const AddNewStore: React.FC = () => {
  const { createNewStore } = useCreateStore();
  return (
    <ModuleLayout>
      <BreadCrumps pathItems={["Store Records", "new"]} />
      <StoreForm
        formName="Add New Store"
        cancelButton={<CancelButton />}
        submitButtonText="Create"
        onSubmit={createNewStore}
        variant="form"
      />
    </ModuleLayout>
  );
};

export default AddNewStore;
