import React from "react";

import { Form } from "antd";
import { NamePath } from "antd/lib/form/interface";

import dropdownOptions from "app/utils/time-dropdown-options";
import Label from "common/components/label";
import Select from "common/components/select";

import "./styles.less";

const TimeRangeSelect: React.FC<{
  startTimeNamePath: NamePath;
  endTimeNamePath: NamePath;
  startTimeLabel: string;
  closeTimeLabel: string;
}> = ({
  startTimeNamePath,
  endTimeNamePath,
  startTimeLabel,
  closeTimeLabel,
}) => (
  <div className="time-range-select-wrapper">
    <div>
      <Label>{startTimeLabel}</Label>
      <Form.Item name={startTimeNamePath} rules={[{ required: true }]}>
        <Select
          className="time-selector"
          size="large"
          options={dropdownOptions}
        />
      </Form.Item>
    </div>
    <div>
      <Label>{closeTimeLabel}</Label>
      <Form.Item name={endTimeNamePath} rules={[{ required: true }]}>
        <Select
          className="time-selector"
          size="large"
          options={dropdownOptions}
        />
      </Form.Item>
    </div>
  </div>
);

export default TimeRangeSelect;
