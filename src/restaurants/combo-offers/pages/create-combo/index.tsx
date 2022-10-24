import React from 'react';

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import ModuleLayout from "common/components/module-layout";
import ComboOffersForm from 'restaurants/combo-offers/components/combo-offers-form';
import { useRouteToComboRoot } from 'restaurants/combo-offers/hooks';

const CreateCombo: React.FC = () => {
  const routeToRoot = useRouteToComboRoot();
  return (
    <ModuleLayout>
      <BreadCrumps pathItems={["Combo offers", "edit"]} />
      <ComboOffersForm
        submitButtonText="Create"
        cancelButton={
          <Button onClick={routeToRoot} size="large">
            Cancel
          </Button>
        }
        formName="Add New Combo"
        // onSubmit={create}
        variant="create-form"
        // loading={isLoading}
      />
    </ModuleLayout>
  );
};

export default CreateCombo;
