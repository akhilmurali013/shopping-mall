import React from "react";

import { Form } from "antd";

import dropdownOptions from "app/utils/time-dropdown-options";
import Label from "common/components/label";
import Select from "common/components/select";

import "./styles.less";

const StoreTimingSelect: React.FC = () => (
  <div className="time-range-select-wrapper">
    <div>
      <Label>Opening time</Label>
      <Form.Item name={["timing", "open"]} rules={[{ required: true }]}>
        <Select
          className="time-selector"
          size="large"
          options={dropdownOptions}
        />
      </Form.Item>
    </div>
    <div>
      <Label>Close time</Label>
      <Form.Item name={["timing", "close"]} rules={[{ required: true }]}>
        <Select
          className="time-selector"
          size="large"
          options={dropdownOptions}
        />
      </Form.Item>
    </div>
  </div>
);

export default StoreTimingSelect;
