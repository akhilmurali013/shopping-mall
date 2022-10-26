import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import Loader from "common/components/loader";
import ModuleLayout from "common/components/module-layout";
import ComboOffersForm from "restaurants/combo-offers/components/combo-offers-form";
import {
  useGetComboOffer,
  useUpdateComboOffer,
} from "restaurants/combo-offers/hooks";
import mapComboDataToComboFormValues from "restaurants/combo-offers/services/map-combo-data-to-combo-form-values";

const ViewCombo: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetComboOffer(id);
  const { update, isLoading: updating } = useUpdateComboOffer(id);
  const navigate = useNavigate();

  const combo = data?.data;
  return (
    <ModuleLayout>
      <BreadCrumps pathItems={["Combo offers", "edit"]} />
      {isLoading && <Loader />}
      {!!combo && (
        <ComboOffersForm
          comboId={combo?.comboId}
          cancelButton={
            <Button onClick={() => navigate(-1)} size="large">
              Edit
            </Button>
          }
          formName={combo?.comboName ?? ""}
          variant="update-form"
          submitButtonText="Save details"
          defaultValues={mapComboDataToComboFormValues(combo)}
          onSubmit={update}
          loading={updating}
        />
      )}
    </ModuleLayout>
  );
};

export default ViewCombo;
