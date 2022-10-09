import React from "react";

import { Select as AntDSelect, SelectProps } from "antd";

import Icon from "../icon";

import "./styles.less";

const { Option } = AntDSelect;

const Select: React.FC<
  SelectProps & {
    options: { label: string; value: string | number }[];
    value?: string | number;
  }
> = ({ options, value, ...props }) => (
  <AntDSelect {...props} value={value}>
    {options?.map((option) => (
      <Option key={option.value} value={option.value}>
        {option.label}
        {value === option.value && (
          <Icon name="check" className="selected-option-icon" />
        )}
      </Option>
    ))}
  </AntDSelect>
);

export default Select;
