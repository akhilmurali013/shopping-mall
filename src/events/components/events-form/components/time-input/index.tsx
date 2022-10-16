import React from "react";

import { Form } from "antd";

import { EventType } from "app/types/events";
import dropdownOptions from "app/utils/time-dropdown-options";
import Label from "common/components/label";
import Select from "common/components/select";

import "./styles.less";

const DateInput: React.FC = () => (
  <Form.Item dependencies={["eventType"]} noStyle>
    {({ getFieldValue }) => (
      <div className="time-range-select-wrapper">
        <div>
          <Label>Start time</Label>
          <Form.Item
            name={["time", "startTime"]}
            rules={[
              {
                validator(_, value) {
                  if (
                    getFieldValue("eventType") === EventType.SCHEDULED &&
                    !value
                  )
                    return Promise.reject(new Error("Required field"));
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Select
              className="time-selector"
              size="large"
              options={dropdownOptions}
            />
          </Form.Item>
        </div>
        <div>
          <Label>End time</Label>
          <Form.Item
            name={["time", "endTime"]}
            rules={[
              {
                validator(_, value) {
                  if (
                    getFieldValue("eventType") === EventType.SCHEDULED &&
                    !value
                  )
                    return Promise.reject(new Error("Required field"));
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Select
              className="time-selector"
              size="large"
              options={dropdownOptions}
            />
          </Form.Item>
        </div>
      </div>
    )}
  </Form.Item>
);

export default DateInput;
