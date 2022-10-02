import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import DeleteDialog from "common/components/delete-dialog";
import Icon from "common/components/icon";
import ModuleLayout from "common/components/module-layout";
import Table from "common/components/table";
import CategoryPill from "restaurants/components/catagory-pill";
import {
  useDeleteRestaurant,
  useFoodGlobalData,
  useGetRestaurants,
} from "restaurants/hooks";
import routes from "restaurants/routes";
import { Restaurant } from "types";

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

const ListOfRestaurants: React.FC = () => {
  const navigate = useNavigate();
  const { mappedData: mappedGlobalData } = useFoodGlobalData();
  const { data } = useGetRestaurants();
  const { mutate: deleteRestaurant, isLoading: deletingRestaurant } =
    useDeleteRestaurant();

  const [selectedStore, setSelectedStore] = useState<Restaurant | undefined>();

  const dataSource = useMemo(
    () =>
      data?.restaurants?.map((restaurant) => ({
        storeName: <div>{restaurant.restaurantName}</div>,
        ownerName: restaurant.ownerName,
        location: restaurant.floorId,
        category: (
          <div className="table-category-cell">
            {restaurant?.cuisineStyleIds?.map((cuisineStyleId) => (
              <CategoryPill
                key={cuisineStyleId}
                cuisineStyle={
                  mappedGlobalData?.cuisineStyles?.[`${cuisineStyleId}`]
                }
              />
            ))}
          </div>
        ),
        actions: (
          <div className="table-actions-cell">
            <button type="button" className="action-button">
              <Icon name="view" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedStore(restaurant)}
              className="action-button"
            >
              <Icon name="bin" />
            </button>
            <button type="button" className="action-button">
              <Icon name="pencil" />
            </button>
          </div>
        ),
      })),
    [data, mappedGlobalData]
  );

  return (
    <>
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
        <Table columns={columns} dataSource={dataSource} />
      </ModuleLayout>
      {selectedStore?.restaurantId && (
        <DeleteDialog
          open
          header={`Delete ${selectedStore.restaurantName}`}
          description={`Are you sure you want to delete ${selectedStore.restaurantName} from  Restaurants? This action cannot be undone.`}
          onClose={() => setSelectedStore(undefined)}
          onDeleteClick={() =>
            deleteRestaurant({ id: selectedStore.restaurantId })
          }
          loading={deletingRestaurant}
        />
      )}
    </>
  );
};

export default ListOfRestaurants;
