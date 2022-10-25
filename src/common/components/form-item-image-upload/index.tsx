import React from "react";

import { Form } from "antd";

import ImageUpload from "common/components/image-upload";

const FormItemImageUpload: React.FC<{
  name: string;
  required?: boolean;
  deleteImage?: () => void;
  disabled: boolean;
}> = ({ name, required = true, deleteImage, disabled }) => (
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
        JSON.stringify(prevValues) !== JSON.stringify(currentValues)
      }
      noStyle
    >
      {({ getFieldValue, setFieldValue, validateFields }) => (
        <ImageUpload
          disabled={disabled}
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
          deleteImage={
            getFieldValue([name, "url"]) && deleteImage
              ? deleteImage
              : undefined
          }
        />
      )}
    </Form.Item>
  </Form.Item>
);

export default FormItemImageUpload;
