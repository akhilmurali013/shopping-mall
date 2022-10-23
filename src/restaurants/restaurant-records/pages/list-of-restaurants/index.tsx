import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import { DishCategory, Restaurant } from "app/types/restaurant";
import Icon from "common/components/icon";
import ModuleLayout from "common/components/module-layout";
import Table from "common/components/table";
import CategoryPill from "restaurants/restaurant-records/components/catagory-pill";
import DeleteRestaurantModal from "restaurants/restaurant-records/components/delete-restaurant-modal";
import {
  useDeleteRestaurant,
  useGetRestaurants,
} from "restaurants/restaurant-records/hooks";
import routes from "restaurants/restaurant-records/routes";

import RestaurantFilters from "./components/filters";

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

export type RestaurantFilterType = {
  query?: string;
  category?: DishCategory | undefined;
};

const ListOfRestaurants: React.FC = () => {
  const [filters, setFilters] = useState<RestaurantFilterType>();
  const navigate = useNavigate();
  const { data } = useGetRestaurants(filters);
  const { mutateAsync: deleteRestaurant, isLoading: deletingRestaurant } =
    useDeleteRestaurant();

  const [selectedStore, setSelectedStore] = useState<Restaurant | undefined>();

  const dataSource = useMemo(
    () =>
      data?.data?.restaurants?.map((restaurant) => ({
        storeName: <div>{restaurant.restaurantName}</div>,
        ownerName: restaurant.ownerName,
        location: restaurant.floor,
        category: (
          <div className="table-category-cell">
            {restaurant?.cuisineStyles?.map((cuisineStyle) => (
              <CategoryPill key={cuisineStyle} cuisineStyle={cuisineStyle} />
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
    [data]
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
        <RestaurantFilters filters={filters} setFilters={setFilters} />
        <Table columns={columns} dataSource={dataSource} />
      </ModuleLayout>
      {selectedStore?.restaurantId && (
        <DeleteRestaurantModal
          restaurantName={selectedStore?.restaurantName}
          onClose={() => setSelectedStore(undefined)}
          onDelete={() =>
            deleteRestaurant({ id: selectedStore.restaurantId }).then(() =>
              setSelectedStore(undefined)
            )
          }
          loading={deletingRestaurant}
        />
      )}
    </>
  );
};

export default ListOfRestaurants;
