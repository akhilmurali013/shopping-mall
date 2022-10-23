import React from "react";

import { Form } from "antd";

import MultiSelect from "common/components/multi-select";
import cuisineStyleOptions from "restaurants/restaurant-records/services/cuisine-style-options";

const CuisineStylesSelector: React.FC = () => (
  <Form.Item
    shouldUpdate={(prevValues, currentValues) =>
      JSON.stringify(prevValues) !== JSON.stringify(currentValues)
    }
  >
    {({ getFieldValue, setFieldValue }) => (
      <MultiSelect
        removeSelectedOptions
        values={
          Array.isArray(getFieldValue("cuisineStyles"))
            ? getFieldValue("cuisineStyles")
            : []
        }
        options={cuisineStyleOptions}
        onOptionSelect={(value) => {
          setFieldValue("cuisineStyles", [
            ...(Array.isArray(getFieldValue("cuisineStyles"))
              ? [...getFieldValue("cuisineStyles"), value]
              : [value]),
          ]);
        }}
        onOptionDeselect={(value) => {
          setFieldValue("cuisineStyles", [
            ...(Array.isArray(getFieldValue("cuisineStyles"))
              ? getFieldValue("cuisineStyles").filter(
                  (v: string) => v !== value
                )
              : [value]),
          ]);
        }}
      />
    )}
  </Form.Item>
);

export default CuisineStylesSelector;
