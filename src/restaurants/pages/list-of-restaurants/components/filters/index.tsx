import React from "react";

import { Input } from "antd";

import Icon from "common/components/icon";
import Label from "common/components/label";
import Select from "common/components/select";
import dishCategoryOptions from "restaurants/services/dish-category-options";

import { RestaurantFilterType } from "../../index";

import "./styles.less";

const dishCategoryOptionsModified = [
  {
    label: "All",
    value: "",
  },
  ...dishCategoryOptions,
];

const RestaurantFilters: React.FC<{
  filters?: RestaurantFilterType;
  setFilters: React.Dispatch<
    React.SetStateAction<RestaurantFilterType | undefined>
  >;
}> = ({ filters, setFilters }) => (
  <div className="restaurant-filter-form">
    <div className="filter-item">
      <Label>Search for Restaurant</Label>
      <Input
        size="large"
        value={filters?.query}
        placeholder="Search"
        onChange={(e) => {
          setFilters((p) => ({ ...p, query: e?.target?.value ?? "" }));
        }}
        prefix={<Icon name="search" />}
      />
    </div>
    <div className="filter-item">
      <div>
        <Label>Category</Label>
      </div>
      <Select
        size="large"
        defaultValue=""
        className="category-select"
        options={dishCategoryOptionsModified}
        onChange={(v) => {
          setFilters((p) => ({ ...p, category: v }));
        }}
      />
    </div>
  </div>
);

export default RestaurantFilters;
