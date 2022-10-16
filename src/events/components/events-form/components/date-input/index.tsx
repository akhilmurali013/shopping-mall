import React from "react";

import { DatePicker, Form } from "antd";

import { EventType } from "app/types/events";
import Label from "common/components/label";

import "./styles.less";

const DateInput: React.FC = () => (
  <Form.Item dependencies={["eventType"]} noStyle>
    {({ getFieldValue }) =>
      getFieldValue("eventType") === EventType.ALL_DAY ? (
        <Form.Item name={["date", "startDate"]}>
          <DatePicker size="large" className="date-selector" />
        </Form.Item>
      ) : (
        <div className="date-range-select-wrapper">
          <div>
            <Label>Start date</Label>
            <Form.Item
              name={["date", "startDate"]}
              rules={[{ required: true }]}
            >
              <DatePicker className="date-selector" size="large" />
            </Form.Item>
          </div>
          <div>
            <Label>End Date</Label>
            <Form.Item
              name={["date", "endDate"]}
              rules={[
                {
                  validator(_, value) {
                    if (
                      getFieldValue("eventType") !== EventType.ALL_DAY &&
                      !value
                    )
                      return Promise.reject(new Error("Required field"));
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <DatePicker className="date-selector" size="large" />
            </Form.Item>
          </div>
        </div>
      )
    }
  </Form.Item>
);

export default DateInput;
