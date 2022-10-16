import React from "react";

import { Input } from "antd";

import Icon from "common/components/icon";
import Label from "common/components/label";
import Select from "common/components/select";
import { EventFilterType } from "events/pages/event-list";
import eventStatusOptions from "events/services/event-status-options";

import "./styles.less";

const eventStatusOptionsModified = [
  {
    label: "All",
    value: "",
  },
  ...eventStatusOptions,
];

const StoreFilters: React.FC<{
  filters?: EventFilterType;
  setFilters: React.Dispatch<React.SetStateAction<EventFilterType | undefined>>;
}> = ({ filters, setFilters }) => (
  <div className="filter-form">
    <div className="filter-item">
      <Label>Search for Events</Label>
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
        <Label>Status</Label>
      </div>
      <Select
        size="large"
        defaultValue=""
        className="category-select"
        options={eventStatusOptionsModified}
        onChange={(v) => {
          setFilters((p) => ({ ...p, status: v }));
        }}
      />
    </div>
  </div>
);

export default StoreFilters;
