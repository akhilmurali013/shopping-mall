import React from "react";

import { Form } from "antd";

import ImageUpload from "common/components/image-upload";

const FormItemImageUpload: React.FC<{
  name: string;
  required?: boolean;
}> = ({ name, required = true }) => (
  <Form.Item
    name={name}
    rules={[
      {
        validator: async (_, value) => {
          if (value?.blob) {
            if (
              !["image/png", "image/jpeg", "image/jpg"].includes(
                value?.blob?.type
              )
            )
              return Promise.reject(new Error("Unsupported format"));
          }
          if (required && !value?.blob && !value?.url)
            return Promise.reject(new Error("Image is required"));
          return Promise.resolve();
        },
      },
    ]}
  >
    <Form.Item
      shouldUpdate={(prevValues, currentValues) =>
        JSON.stringify(prevValues.brandLogo) !==
        JSON.stringify(currentValues.brandLogo)
      }
      noStyle
    >
      {({ getFieldValue, setFieldValue, validateFields }) => (
        <ImageUpload
          defaultImageUrl={getFieldValue([name, "url"]) ?? ""}
          imageBlobUrl={
            getFieldValue([name, "blob"])
              ? URL.createObjectURL(getFieldValue([name, "blob"]))
              : undefined
          }
          onChange={(info) => {
            setFieldValue([name, "blob"], info.file);
            validateFields([name]);
          }}
          clearImage={() => {
            setFieldValue(name, {});
            validateFields([name]);
          }}
        />
      )}
    </Form.Item>
  </Form.Item>
);

export default FormItemImageUpload;
