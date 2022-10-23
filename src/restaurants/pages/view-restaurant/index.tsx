import React, { useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import Icon from "common/components/icon";
import Loader from "common/components/loader";
import ModuleLayout from "common/components/module-layout";
import RestaurantDeleteModal from "restaurants/components/delete-restaurant-modal";
import RestaurantForm from "restaurants/components/restaurant-form";
import { useDeleteRestaurant, useGetRestaurant } from "restaurants/hooks";
import routes from "restaurants/routes";
import mapRestaurantToRestaurantFormData from "restaurants/services/map-restaurant-to-restaurant-form-data";

const ViewRestaurantDetails: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetRestaurant(id);
  const navigate = useNavigate();
  const { mutateAsync, isLoading: isDeleting } = useDeleteRestaurant();
  const [showDeleteModal, toggleShow] = useState(false);

  const formData = useMemo(() => {
    if (data) return mapRestaurantToRestaurantFormData(data?.data);
    return undefined;
  }, [data]);

  const onDelete = () => {
    if (data?.data?.restaurantId)
      mutateAsync({ id: data?.data?.restaurantId }).then(() => {
        toggleShow(false);
        navigate(`/a/${routes.root}`);
      });
  };

  return (
    <>
      <ModuleLayout>
        <BreadCrumps pathItems={["Restaurant Records", "Details"]} />
        {isLoading && <Loader />}
        {!isLoading && (
          <RestaurantForm
            submitButtonText="Create"
            cancelButton={
              <>
                <Button
                  size="large"
                  htmlType="button"
                  onClick={() => toggleShow(true)}
                >
                  <Icon name="bin" />
                </Button>
                <Button
                  size="large"
                  type="primary"
                  htmlType="button"
                  onClick={() => navigate(routes.edit)}
                >
                  Edit Details
                </Button>
              </>
            }
            formName={data?.data?.restaurantName ?? ""}
            defaultValues={formData}
            variant="view"
          />
        )}
      </ModuleLayout>
      {showDeleteModal && (
        <RestaurantDeleteModal
          restaurantName={data?.data?.restaurantName ?? ""}
          onClose={() => toggleShow(false)}
          onDelete={onDelete}
          loading={isDeleting}
        />
      )}
    </>
  );
};

export default ViewRestaurantDetails;
