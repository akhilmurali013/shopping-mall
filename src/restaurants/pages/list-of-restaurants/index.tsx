import React from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import Icon from "common/components/icon";
import ModuleLayout from "common/components/module-layout";
import Table from "common/components/table";
import routes from "restaurants/routes";

const ListOfRestaurants: React.FC = () => {
  const navigate = useNavigate();
  return (
    <ModuleLayout>
      <ModuleLayout.Header header="Restaurant Records">
        <Button
          size="large"
          icon={<Icon name="plus" style={{ marginRight: "10px" }} />}
          onClick={() => navigate(routes.addNew)}
        >
          Add new record
        </Button>
      </ModuleLayout.Header>
      <Table />
    </ModuleLayout>
  );
};

export default ListOfRestaurants;
