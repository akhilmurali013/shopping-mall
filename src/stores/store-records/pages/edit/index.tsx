import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import ModuleLayout from "common/components/module-layout";
import StoreForm from "stores/store-records/components/store-form";
import { useGetStoreDetails, useUpdateStore } from "stores/store-records/hooks";

// import mapStoreDataToFromData from "stores/store-records/services/map-store-data-to-from-data";

const EditStoreDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetStoreDetails(id);
  const { update } = useUpdateStore(id);

  return (
    <>
      <ModuleLayout>
        <BreadCrumps pathItems={["Store Records", "details"]} />
        <StoreForm
          formName={data?.data?.name ?? ""}
          cancelButton={
            <Button onClick={() => navigate(-1)} size="large">
              Cancel
            </Button>
          }
          submitButtonText="Save Details"
          onSubmit={(v) => update(v)}
          // defaultValues={mapStoreDataToFromData(data?.data as Store)}
          variant="form"
        />
      </ModuleLayout>
    </>
  );
};

export default EditStoreDetails;
