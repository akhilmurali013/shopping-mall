import React from "react";

import { Input } from "antd";

import Icon from "common/components/icon";
import Label from "common/components/label";
import Select from "common/components/select";
import { StoreFilterType } from "stores/store-records/pages/store-list";
import storeCategoryOptions from "stores/store-records/services/store-category-options";

import "./styles.less";

const storeCategoryOptionsModified = [
  {
    label: "All",
    value: "",
  },
  ...storeCategoryOptions,
];

const StoreFilters: React.FC<{
  filters?: StoreFilterType;
  setFilters: React.Dispatch<React.SetStateAction<StoreFilterType | undefined>>;
}> = ({ filters, setFilters }) => (
  <div className="store-filter-form">
    <div className="filter-item">
      <Label>Search for Store</Label>
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
        options={storeCategoryOptionsModified}
        onChange={(v) => {
          setFilters((p) => ({ ...p, category: v }));
        }}
      />
    </div>
  </div>
);

export default StoreFilters;
