import React from "react";

import { Form } from "antd";

import ImageUpload from "common/components/image-upload";

const BrandLogo: React.FC = () => (
  <Form.Item
    name="brandLogo"
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
          if (!value?.blob && !value?.url)
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
          defaultImageUrl={getFieldValue(["brandLogo", "url"]) ?? ""}
          imageBlobUrl={
            getFieldValue(["brandLogo", "blob"])
              ? URL.createObjectURL(getFieldValue(["brandLogo", "blob"]))
              : undefined
          }
          onChange={(info) => {
            setFieldValue(["brandLogo", "blob"], info.file);
            validateFields(["brandLogo"]);
          }}
          clearImage={() => {
            setFieldValue("brandLogo", {});
            validateFields(["brandLogo"]);
          }}
        />
      )}
    </Form.Item>
  </Form.Item>
);

export default BrandLogo;
