import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import Loader from 'common/components/loader';
import ModuleLayout from "common/components/module-layout";
import ComboOffersForm from 'restaurants/combo-offers/components/combo-offers-form';
import { useGetComboOffer } from 'restaurants/combo-offers/hooks';


const ViewCombo: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetComboOffer(id)
  const navigate = useNavigate();

  const combo = data?.data;
  return (
    <ModuleLayout>
      <BreadCrumps pathItems={["Combo offers", "edit"]} />
      {isLoading && <Loader />}
      {(!!combo) && (
        <ComboOffersForm
          cancelButton={
            <Button
              onClick={() => navigate(-1)}
              size="large"
            >
              Edit
            </Button>
          }
          formName={combo?.comboName ?? ''}
          variant="update-form"
          submitButtonText='Save details'
        />
      )}
    </ModuleLayout>
  );
};

export default ViewCombo;
