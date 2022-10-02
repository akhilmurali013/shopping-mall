import React from "react";

import { Form } from "antd";

import MultiSelect from "common/components/multi-select";

const FoodCatagoriesSelector: React.FC = () => (
  <Form.Item
    shouldUpdate={(prevValues, currentValues) =>
      JSON.stringify(prevValues) !== JSON.stringify(currentValues)
    }
  >
    {({ getFieldValue, setFieldValue }) => (
      <MultiSelect
        removeSelectedOptions
        values={
          Array.isArray(getFieldValue("foodCatagories"))
            ? getFieldValue("foodCatagories")
            : []
        }
        options={[
          { label: "Shawarma", value: "1" },
          { label: "Fried Rice", value: "2" },
          { label: "Beverages", value: "3" },
          { label: "Milk Shakes", value: "4" },
        ]}
        onOptionSelect={(value) => {
          setFieldValue("foodCatagories", [
            ...(Array.isArray(getFieldValue("foodCatagories"))
              ? [...getFieldValue("foodCatagories"), value]
              : [value]),
          ]);
        }}
        onOptionDeselect={(value) => {
          setFieldValue("foodCatagories", [
            ...(Array.isArray(getFieldValue("foodCatagories"))
              ? getFieldValue("foodCatagories").filter(
                  (v: string) => v !== value
                )
              : [value]),
          ]);
        }}
      />
    )}
  </Form.Item>
);

export default FoodCatagoriesSelector;
