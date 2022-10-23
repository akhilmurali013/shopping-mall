import React, { useMemo } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import Loader from "common/components/loader";
import ModuleLayout from "common/components/module-layout";
import RestaurantForm from "restaurants/components/restaurant-form";
import { useGetRestaurant, useUpdateRestaurant } from "restaurants/hooks";
import mapRestaurantToRestaurantFormData from "restaurants/services/map-restaurant-to-restaurant-form-data";

const ViewRestaurantDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetRestaurant(id);
  const { update, isLoading: updating } = useUpdateRestaurant(id ?? "");

  const formData = useMemo(() => {
    if (data) return mapRestaurantToRestaurantFormData(data?.data);
    return undefined;
  }, [data]);

  return (
    <ModuleLayout>
      <BreadCrumps pathItems={["Restaurant Records", "edit"]} />
      {isLoading && <Loader />}
      <RestaurantForm
        submitButtonText="Save Details"
        cancelButton={
          <Button size="large" onClick={() => navigate(-1)} htmlType="button">
            Cancel
          </Button>
        }
        formName={data?.data?.restaurantName ?? ""}
        onSubmit={update}
        loading={updating}
        defaultValues={formData}
        variant="update-form"
      />
    </ModuleLayout>
  );
};

export default ViewRestaurantDetails;
