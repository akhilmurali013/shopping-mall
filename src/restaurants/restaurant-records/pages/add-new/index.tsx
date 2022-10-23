import React from "react";

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import ModuleLayout from "common/components/module-layout";
import RestaurantForm from "restaurants/restaurant-records/components/restaurant-form";
import {
  useCreateRestaurant,
  useRouteToRestaurantRoot,
} from "restaurants/restaurant-records/hooks";

const RestaurantDetails: React.FC = () => {
  const { create, isLoading } = useCreateRestaurant();
  const routeToScreen = useRouteToRestaurantRoot();
  return (
    <ModuleLayout>
      <BreadCrumps pathItems={["Restaurant Records", "edit"]} />
      <RestaurantForm
        submitButtonText="Create"
        cancelButton={
          <Button onClick={routeToScreen} size="large">
            Cancel
          </Button>
        }
        formName="Add New Restaurant"
        onSubmit={create}
        variant="create-form"
        loading={isLoading}
      />
    </ModuleLayout>
  );
};

export default RestaurantDetails;
