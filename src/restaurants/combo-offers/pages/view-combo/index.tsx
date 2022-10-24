import React, { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Button } from "antd";

import BreadCrumps from "common/components/bread-crumps";
import Icon from "common/components/icon";
import Loader from 'common/components/loader';
import ModuleLayout from "common/components/module-layout";
import ComboOffersForm from 'restaurants/combo-offers/components/combo-offers-form';
import ComboDeleteModal from 'restaurants/combo-offers/components/delete-modal';
import { useDeleteComboOffers, useGetComboOffer, useRouteToComboRoot } from 'restaurants/combo-offers/hooks';
import routes from 'restaurants/combo-offers/routes';


const ViewCombo: React.FC = () => {
  const { id } = useParams();
  const { data , isLoading } = useGetComboOffer(id)
  const navigate = useNavigate();
  const routeToRoot = useRouteToComboRoot();
  const [showDeleteModal, toggleShow] = useState(false);
  const { mutateAsync, isLoading: isDeleting } = useDeleteComboOffers();

  const combo = data?.data;
  return (
    <>
      <ModuleLayout>
        <BreadCrumps pathItems={["Combo offers", "details"]} />
        {isLoading && <Loader />}
        {!!combo && (
          <ComboOffersForm
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
                  type="primary"
                  onClick={() => navigate(routes.edit)}
                  size="large"
                >
                  Edit
                </Button>
              </>
            }
            formName={combo?.comboName ?? ''}
            variant="view"
          />
        )}
      </ModuleLayout>
      {showDeleteModal && !!combo && (
        <ComboDeleteModal
          comboName={combo?.comboName ?? ''}
          onClose={() =>  toggleShow(false)}
          onDelete={() => mutateAsync(combo?.comboId).then(
            () => {
              toggleShow(false);
              routeToRoot();
            }
          )}
          loading={isDeleting}
        />
      )}
    </>
  );
};

export default ViewCombo;
