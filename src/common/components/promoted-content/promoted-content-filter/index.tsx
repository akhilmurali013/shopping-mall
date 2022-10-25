import React, { useMemo, useState } from "react";

import { Input } from "antd";

import Icon from "common/components/icon";
import Label from "common/components/label";
import Select from "common/components/select";

import "./styles.less";

export type PromotedSectionType = {
  id: string;
  header: string;
  description: string;
  Component: React.FC;
  noOfItems: number;
  Form: React.FC<{
    header: PromotedSectionType["header"];
    description: PromotedSectionType["description"];
    noOfItems: PromotedSectionType["noOfItems"];
    redirectUrl: PromotedSectionType["redirectUrl"];
  }>;
  redirectUrl: string;
};

export type SectionFilterType = {
  query?: string;
  section?: string | undefined;
};

const SectionFilters: React.FC<{
  filters?: SectionFilterType;
  setFilters: React.Dispatch<
    React.SetStateAction<SectionFilterType | undefined>
  >;
  supportedSections: PromotedSectionType[];
}> = ({ filters, setFilters, supportedSections }) => {
  const sectionOptionsModified = useMemo(
    () => [
      {
        label: "All pages",
        value: "",
      },
      ...supportedSections.map((section) => ({
        label: section.header,
        value: section.id,
      })),
    ],
    [supportedSections]
  );

  return (
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
};

const usePromotedContentFilter = (
  promotedContentSections: PromotedSectionType[]
) => {
  const [sectionFilters, setFilterChanges] = useState<SectionFilterType>();
  const filteredSections = useMemo(() => {
    if (sectionFilters?.section) {
      return promotedContentSections?.filter(
        (sec) => sec.id === sectionFilters.section
      );
    }
    if (sectionFilters?.query) {
      return promotedContentSections?.filter((sec) =>
        sec.header
          .toLowerCase()
          ?.includes(sectionFilters?.query?.toLocaleLowerCase() ?? "")
      );
    }
    return promotedContentSections;
  }, [sectionFilters]);

  const FilterForm = useMemo(
    () => (
      <SectionFilters
        filters={sectionFilters}
        setFilters={setFilterChanges}
        supportedSections={promotedContentSections}
      />
    ),
    []
  );

  return { FilterForm, filteredSections };
};

export default usePromotedContentFilter;
