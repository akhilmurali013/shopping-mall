import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import Icon from "common/components/icon";
import ModuleLayout from "common/components/module-layout";
import { root } from "stores/config";
import StoreDeleteModal from "stores/store-records/components/store-delete-modal";
import StoreForm from "stores/store-records/components/store-form";
import { useDeleteStore, useGetStoreDetails } from "stores/store-records/hooks";
import routes from "stores/store-records/routes";

// import mapStoreDataToFromData from "stores/store-records/services/map-store-data-to-from-data";

const ViewStoreDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, toggleDeleteModal] = useState(false);
  const { data } = useGetStoreDetails(id);
  const { mutateAsync: deleteStore, isLoading } = useDeleteStore();

  return (
    <>
      <ModuleLayout>
        <BreadCrumps pathItems={["Store Records", "details"]} />
        <StoreForm
          formName={data?.data?.name ?? ""}
          cancelButton={
            <>
              <Button onClick={() => toggleDeleteModal(true)} size="large">
                <Icon name="bin" style={{ marginTop: "5px" }} />
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate(routes.edit)}
                disabled={false}
              >
                Edit Details
              </Button>
            </>
          }
          // defaultValues={mapStoreDataToFromData(data?.data as Store)}
          variant="view"
        />
      </ModuleLayout>
      {showDeleteModal && (
        <StoreDeleteModal
          storeName={data?.data?.name ?? ""}
          onClose={() => toggleDeleteModal(false)}
          onDelete={() =>
            deleteStore({ id: data?.data?.storeId as string }).then(() => {
              toggleDeleteModal(false);
              navigate(`/a/${root}/${routes.root}`);
            })
          }
          loading={isLoading}
        />
      )}
    </>
  );
};

export default ViewStoreDetails;
