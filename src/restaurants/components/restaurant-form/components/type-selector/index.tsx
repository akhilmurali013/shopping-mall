import React from "react";

import { Form } from "antd";

import MultiSelect from "common/components/multi-select";

const TypeSelector: React.FC = () => (
  <Form.Item
    shouldUpdate={(prevValues, currentValues) =>
      JSON.stringify(prevValues) !== JSON.stringify(currentValues)
    }
  >
    {({ getFieldValue, setFieldValue }) => (
      <MultiSelect
        removeSelectedOptions
        values={
          Array.isArray(getFieldValue("type")) ? getFieldValue("type") : []
        }
        options={[
          { label: "Arabic", value: "1" },
          { label: "Fast Food", value: "2" },
          { label: "Kerala", value: "3" },
          { label: "Indian", value: "4" },
        ]}
        onOptionSelect={(value) => {
          setFieldValue("type", [
            ...(Array.isArray(getFieldValue("type"))
              ? [...getFieldValue("type"), value]
              : [value]),
          ]);
        }}
        onOptionDeselect={(value) => {
          setFieldValue("type", [
            ...(Array.isArray(getFieldValue("type"))
              ? getFieldValue("type").filter((v: string) => v !== value)
              : [value]),
          ]);
        }}
      />
    )}
  </Form.Item>
);

export default TypeSelector;
