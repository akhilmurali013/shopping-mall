import React from "react";

import { Button, Form, Input } from "antd";
import { NamePath } from "antd/lib/form/interface";

import "./styles.less";
import Icon from "common/components/icon";

const PhoneNumberInput: React.FC<{
  name: NamePath;
  maximumAllowed?: number;
  disabled: boolean;
}> = ({ name, maximumAllowed, disabled }) => (
  <Form.List
    name={name}
    rules={[
      {
        validator: async (_, names) => {
          if (!names || !names.length) {
            return Promise.reject(new Error("At least 1 number is required"));
          }
          return Promise.resolve();
        },
      },
    ]}
  >
    {(fields, { add, remove }) => (
      <>
        {fields.map((field, index) => (
          <Form.Item required={false} key={field.key}>
            <div className="phone-number-item">
              <Form.Item
                {...field}
                validateTrigger={["onChange", "onBlur"]}
                rules={[
                  {
                    required: true,
                    message:
                      "Please input a valid phone number or delete this field.",
                  },
                ]}
                noStyle
              >
                <Input placeholder="Enter phone number" size="large" />
              </Form.Item>
              {index !== 0 && !disabled && (
                <Icon name="bin" onClick={() => remove(index)} />
              )}
            </div>
          </Form.Item>
        ))}
        {(!maximumAllowed || fields?.length < maximumAllowed) && (
          <Form.Item>
            <Button onClick={() => add()} size="large">
              Add another number
            </Button>
          </Form.Item>
        )}
      </>
    )}
  </Form.List>
);

export default PhoneNumberInput;
