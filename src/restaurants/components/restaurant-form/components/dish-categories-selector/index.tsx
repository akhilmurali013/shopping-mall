import React from "react";

import { Form } from "antd";

import MultiSelect from "common/components/multi-select";
import dishCategoryOptions from "restaurants/services/dish-category-options";

const DishCatagoriesSelector: React.FC = () => (
  <Form.Item
    shouldUpdate={(prevValues, currentValues) =>
      JSON.stringify(prevValues) !== JSON.stringify(currentValues)
    }
  >
    {({ getFieldValue, setFieldValue }) => (
      <MultiSelect
        removeSelectedOptions
        values={
          Array.isArray(getFieldValue("dishCategories"))
            ? getFieldValue("dishCategories")
            : []
        }
        options={dishCategoryOptions}
        onOptionSelect={(value) => {
          setFieldValue("dishCategories", [
            ...(Array.isArray(getFieldValue("dishCategories"))
              ? [...getFieldValue("dishCategories"), value]
              : [value]),
          ]);
        }}
        onOptionDeselect={(value) => {
          setFieldValue("dishCategories", [
            ...(Array.isArray(getFieldValue("dishCategories"))
              ? getFieldValue("dishCategories").filter(
                  (v: string) => v !== value
                )
              : [value]),
          ]);
        }}
      />
    )}
  </Form.Item>
);

export default DishCatagoriesSelector;
