import React from "react";

import { Form } from "antd";

import ImageUpload from "common/components/image-upload";

const StoreImage: React.FC = () => (
  <Form.Item
    name="storeImage"
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
        JSON.stringify(prevValues.storeImage) !==
        JSON.stringify(currentValues.storeImage)
      }
      noStyle
    >
      {({ getFieldValue, setFieldValue, validateFields }) => (
        <ImageUpload
          defaultImageUrl={getFieldValue(["storeImage", "url"]) ?? ""}
          imageBlobUrl={
            getFieldValue(["storeImage", "blob"])
              ? URL.createObjectURL(getFieldValue(["storeImage", "blob"]))
              : undefined
          }
          onChange={(info) => {
            setFieldValue(["storeImage", "blob"], info.file);
            validateFields(["storeImage"]);
          }}
          clearImage={() => {
            setFieldValue("storeImage", {});
            validateFields(["storeImage"]);
          }}
        />
      )}
    </Form.Item>
  </Form.Item>
);

export default StoreImage;
