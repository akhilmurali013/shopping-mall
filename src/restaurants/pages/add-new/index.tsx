import React from "react";

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import ModuleLayout from "common/components/module-layout";

import "./styles.less";

const RestaurantDetails: React.FC = () => (
  <ModuleLayout>
    <BreadCrumps pathItems={["Restaurant Records", "edit"]} />
    <ModuleLayout.Header header="Almaaz Shawarma" className="module-header">
      <Button size="large">Cancel</Button>
      <Button size="large" type="primary">
        Save Details
      </Button>
    </ModuleLayout.Header>
  </ModuleLayout>
);

export default RestaurantDetails;
