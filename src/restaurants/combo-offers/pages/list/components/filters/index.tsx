import React from 'react';

import { Input } from 'antd';

import Icon from 'common/components/icon';
import Label from 'common/components/label';

import { ComboOfferFilterType } from '../../index';

import "./styles.less";

const ComboFilters: React.FC<{
  filters?: ComboOfferFilterType;
  setFilters: React.Dispatch<React.SetStateAction<ComboOfferFilterType | undefined>>;
}> = ({ filters, setFilters }) => (
  <div className="combo-offers-filter-form">
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
  </div> 
);

export default ComboFilters;
