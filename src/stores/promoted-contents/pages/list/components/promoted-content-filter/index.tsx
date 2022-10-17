import React from "react";

import { Input } from "antd";

import Icon from "common/components/icon";
import Label from "common/components/label";
import Select from "common/components/select";
import promotedContentSections from "stores/promoted-contents/pages/list/promoted-content-sections";

import { SectionFilterType } from "../../index";

import "./styles.less";

const sectionOptionsModified = [
  {
    label: "All pages",
    value: "",
  },
  ...promotedContentSections.map((section) => ({
    label: section.header,
    value: section.id,
  })),
];

const SectionFilters: React.FC<{
  filters?: SectionFilterType;
  setFilters: React.Dispatch<
    React.SetStateAction<SectionFilterType | undefined>
  >;
}> = ({ filters, setFilters }) => (
  <div className="filter-form">
    <div className="filter-item">
      <Label>Search for Section</Label>
      <Input
        size="large"
        value={filters?.query}
        placeholder="Search"
        onChange={(e) => {
          setFilters((p) => ({ ...p, query: e?.target?.value ?? "" }));
        }}
        prefix={<Icon name="Search" />}
      />
    </div>
    <div className="filter-item">
      <div>
        <Label>Page</Label>
      </div>
      <Select
        size="large"
        defaultValue=""
        className="category-select"
        options={sectionOptionsModified}
        onChange={(v) => {
          setFilters((p) => ({ ...p, section: v }));
        }}
      />
    </div>
  </div>
);

export default SectionFilters;
