import React from "react";

import { Form } from "antd";

import FileUpload from "common/components/file-upload";

const FormItemImageUpload: React.FC<{
  name: string;
  required?: boolean;
  deleteFile?: () => void;
  defaultFileName: string;
  isEditable: boolean;
}> = ({ name, required = true, deleteFile, defaultFileName, isEditable }) => (
  <Form.Item
    name={name}
    rules={[
      {
        validator: async (_, value) => {
          if (value?.blob) {
            if (
              ![
                "application/pdf",
                "image/png",
                "image/jpeg",
                "image/jpg",
              ].includes(value?.blob?.type)
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
        <FileUpload
          defaultFileName={defaultFileName}
          blob={getFieldValue([name, "blob"])}
          defaultURL={getFieldValue([name, "url"]) ?? ""}
          onDelete={
            getFieldValue([name, "url"])
              ? deleteFile
              : () => {
                  setFieldValue(name, {});
                  validateFields([name]);
                }
          }
          onChange={(info) => {
            setFieldValue([name, "blob"], info.file);
            validateFields([name]);
          }}
          isEditable={isEditable}
        />
      )}
    </Form.Item>
  </Form.Item>
);

export default FormItemImageUpload;
