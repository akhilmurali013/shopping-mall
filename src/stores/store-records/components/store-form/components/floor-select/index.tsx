import React from "react";

import { Form } from "antd";

import Select from "common/components/select";

const floorData = [
  { value: "0", label: "Ground Floor" },
  { value: "1", label: "1st Floor" },
  { value: "2", label: "2nd Floor" },
  { value: "3", label: "3rd Floor" },
  { value: "4", label: "4th Floor" },
];

const LocationSelector: React.FC = () => (
  <Form.Item
    name="location"
    rules={[{ required: true, message: "Required field" }]}
  >
    <Select options={floorData} size="large" style={{ maxWidth: "240px" }} />
  </Form.Item>
);

export default LocationSelector;
