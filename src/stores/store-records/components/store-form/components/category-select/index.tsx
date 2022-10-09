import React from "react";

import { Form } from "antd";

import MultiSelect from "common/components/multi-select";
import storeCategoryOptions from "stores/store-records/services/store-category-options";

const StoreCatagoriesSelector: React.FC = () => (
  <Form.Item
    shouldUpdate={(prevValues, currentValues) =>
      JSON.stringify(prevValues) !== JSON.stringify(currentValues)
    }
  >
    {({ getFieldValue, setFieldValue }) => (
      <Form.List
        name="categories"
        rules={[
          {
            validator: async (_, value) => {
              if (!value || !value?.length) {
                return Promise.reject(new Error("Select some category"));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        {(_fields, { add }, { errors }) => (
          <MultiSelect
            removeSelectedOptions
            values={
              Array.isArray(getFieldValue("categories"))
                ? getFieldValue("categories")
                : []
            }
            options={storeCategoryOptions}
            onOptionSelect={add}
            onOptionDeselect={(value) => {
              setFieldValue("categories", [
                ...(Array.isArray(getFieldValue("categories"))
                  ? getFieldValue("categories").filter(
                      (v: string) => v !== value
                    )
                  : [value]),
              ]);
            }}
            status={errors?.length ? "error" : undefined}
          />
        )}
      </Form.List>
    )}
  </Form.Item>
);

export default StoreCatagoriesSelector;
