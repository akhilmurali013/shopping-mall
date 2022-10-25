import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import { ComboOffer } from "app/types/restaurant";
import Icon from "common/components/icon";
import ModuleLayout from "common/components/module-layout";
import Table from "common/components/table";
import ComboDeleteModal from "restaurants/combo-offers/components/delete-modal";
import {
  useDeleteComboOffers,
  useGetComboOffers,
} from "restaurants/combo-offers/hooks";
import routes from "restaurants/combo-offers/routes";

import ComboFilters from "./components/filters";

import "./styles.less";

const columns = [
  {
    title: "Combo name",
    dataIndex: "comboName",
    key: "comboName",
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

export type ComboOfferFilterType = {
  query?: string;
};

const ComboOffersList: React.FC = () => {
  const { data } = useGetComboOffers();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ComboOfferFilterType>();
  const [selectedCombo, setSelectedCombo] = useState<ComboOffer | undefined>();
  const { mutateAsync, isLoading } = useDeleteComboOffers();

  const filteredCombos = useMemo(
    () =>
      filters?.query
        ? data?.data?.combos?.filter((combo) =>
            combo?.comboName
              ?.toLowerCase()
              ?.includes(filters?.query?.toLowerCase() ?? "")
          )
        : data?.data?.combos,
    [data, filters?.query]
  );

  const dataSource = useMemo(
    () =>
      filteredCombos?.map((combo) => ({
        comboName: (
          <Table.CellWithImage
            imageUrl={combo?.comboImageUrl}
            text={combo?.comboName}
          />
        ),
        cost: `₹ ${combo.price}`,
        description: combo?.comboDescription,
        actions: (
          <div className="table-actions-cell">
            <button
              type="button"
              className="action-button"
              onClick={() => navigate(`${routes.details}/${combo.comboId}`)}
            >
              <Icon name="view" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedCombo(combo)}
              className="action-button"
            >
              <Icon name="bin" />
            </button>
            <button
              type="button"
              className="action-button"
              onClick={() =>
                navigate(`${routes.details}/${combo.comboId}/${routes.edit}`)
              }
            >
              <Icon name="pencil" />
            </button>
          </div>
        ),
      })),
    [filteredCombos]
  );

  return (
    <>
      <ModuleLayout>
        <ModuleLayout.Header header="Combo offers">
          <Button
            size="large"
            icon={<Icon name="plus" style={{ marginRight: "10px" }} />}
            onClick={() => navigate(routes.addNew)}
          >
            Add new combo
          </Button>
        </ModuleLayout.Header>
        <ComboFilters filters={filters} setFilters={setFilters} />
        <Table columns={columns} dataSource={dataSource} />
      </ModuleLayout>
      {selectedCombo && (
        <ComboDeleteModal
          comboName={selectedCombo?.comboName}
          onClose={() => setSelectedCombo(undefined)}
          onDelete={() =>
            mutateAsync(selectedCombo?.comboId).then(() =>
              setSelectedCombo(undefined)
            )
          }
          loading={isLoading}
        />
      )}
    </>
  );
};

export default ComboOffersList;
