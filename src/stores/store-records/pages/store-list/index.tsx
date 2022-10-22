import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import { Store, StoreCatagories } from "app/types/store";
import Icon from "common/components/icon";
import ModuleLayout from "common/components/module-layout";
import Table from "common/components/table";
import CategoryPill from "stores/store-records/components/store-category-pill";
import StoreDeleteModal from "stores/store-records/components/store-delete-modal";
import StoreFilters from "stores/store-records/components/store-filters";
import { useDeleteStore, useGetStores } from "stores/store-records/hooks";
import routes from "stores/store-records/routes";

import "./styles.less";

const columns = [
  {
    title: "Store name",
    dataIndex: "storeName",
    key: "storeName",
  },
  {
    title: "Owner name",
    dataIndex: "ownerName",
    key: "ownerName",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

export type StoreFilterType = {
  query?: string;
  category?: StoreCatagories | undefined;
};

const ListOfRestaurants: React.FC = () => {
  const navigate = useNavigate();
  const [storeFilters, setFilterChanges] = useState<StoreFilterType>();
  const { data } = useGetStores(storeFilters);
  const { mutateAsync: deleteStore, isLoading: storeDeleting } =
    useDeleteStore();

  const [selectedStore, setSelectedStore] = useState<Store | undefined>();

  const dataSource = useMemo(
    () =>
      // eslint-disable-next-line no-underscore-dangle
      data?.data?._embedded?.stores?.map((store) => ({
        storeName: (
          <Table.CellWithImage imageUrl={store?.brandLogo} text={store?.name} />
        ),
        ownerName: store?.ownerName,
        location: store?.location?.name,
        category: (
          <div className="table-category-cell">
            {store?.categories?.map((category) => (
              <CategoryPill category={category} key={category} />
            ))}
          </div>
        ),
        actions: (
          <div className="table-actions-cell">
            <button
              type="button"
              className="action-button"
              onClick={() => navigate(`${routes.details}/${store.storeId}`)}
            >
              <Icon name="view" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedStore(store as unknown as Store)}
              className="action-button"
            >
              <Icon name="bin" />
            </button>
            <button
              type="button"
              className="action-button"
              onClick={() =>
                navigate(`${routes.details}/${store?.storeId}/${routes.edit}`)
              }
            >
              <Icon name="pencil" />
            </button>
          </div>
        ),
      })),
    [data]
  );

  return (
    <>
      <ModuleLayout>
        <ModuleLayout.Header header="Store Records">
          <Button
            size="large"
            icon={<Icon name="plus" style={{ marginRight: "10px" }} />}
            onClick={() => navigate(routes.addNew)}
          >
            Add new store
          </Button>
        </ModuleLayout.Header>
        <StoreFilters filters={storeFilters} setFilters={setFilterChanges} />
        <Table columns={columns} dataSource={dataSource} />
      </ModuleLayout>
      {selectedStore?.storeId && (
        <StoreDeleteModal
          storeName={selectedStore.name ?? ""}
          onClose={() => setSelectedStore(undefined)}
          onDelete={() =>
            deleteStore({ id: selectedStore.storeId }).then(() =>
              setSelectedStore(undefined)
            )
          }
          loading={storeDeleting}
        />
      )}
    </>
  );
};

export default ListOfRestaurants;
