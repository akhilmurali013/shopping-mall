import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "antd";

import { Store } from "app/types/store";
import BreadCrumps from "common/components/bread-crumps";
import Loader from "common/components/loader";
import ModuleLayout from "common/components/module-layout";
import StoreForm from "stores/store-records/components/store-form";
import { useGetStoreDetails, useUpdateStore } from "stores/store-records/hooks";
import mapStoreDataToFromData from "stores/store-records/services/map-store-data-to-from-data";

const EditStoreDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetStoreDetails(id);
  const { update, isLoading: updating } = useUpdateStore(id);

  const store = data?.data;

  return (
    <>
      <ModuleLayout>
        <BreadCrumps pathItems={["Store Records", "details"]} />
        {isLoading && <Loader />}
        {store && (
          <StoreForm
            formName={store?.name ?? ""}
            cancelButton={
              <Button onClick={() => navigate(-1)} size="large">
                Cancel
              </Button>
            }
            submitButtonText="Save Details"
            onSubmit={update}
            defaultValues={mapStoreDataToFromData(store as Store)}
            variant="form"
            loading={updating}
          />
        )}
      </ModuleLayout>
    </>
  );
};

export default EditStoreDetails;
