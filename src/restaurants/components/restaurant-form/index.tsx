import React, { useState } from "react";

import { Form, Input } from "antd";

import TableForm from "common/components/table-form";

import AddAnotherNumber from "./components/add-another-number";
import FoodCategorySelector from "./components/food-categories-selector";
import TypeSelector from "./components/type-selector";

const RestaurantForm: React.FC = () => {
  const [form] = Form.useForm();

  const [showFields, setShowFields] = useState({
    restaurantPhoneNumber2: false,
    ownerPhoneNumber2: false,
  });

  return (
    <Form form={form}>
      <TableForm.Layout>
        <TableForm.Item label="Restaurant name">
          <Form.Item
            name="restaurantName"
            rules={[{ required: true, message: "Required field" }]}
          >
            <Input size="large" />
          </Form.Item>
        </TableForm.Item>
        <TableForm.Item label="Owner name">
          <Form.Item
            name="ownerName"
            rules={[{ required: true, message: "Required field" }]}
          >
            <Input size="large" />
          </Form.Item>
        </TableForm.Item>
        <TableForm.Item label="Restaurant Phone number">
          <Form.Item name="restaurantPhoneNumber">
            <Input type="number" size="large" />
          </Form.Item>
          {showFields.restaurantPhoneNumber2 ? (
            <Form.Item name="restaurantPhoneNumber2">
              <Input type="number" size="large" />
            </Form.Item>
          ) : (
            <AddAnotherNumber
              onClick={() => {
                setShowFields((p) => ({
                  ...p,
                  restaurantPhoneNumber2: true,
                }));
              }}
            />
          )}
        </TableForm.Item>
        <TableForm.Item label="Owner Phone number">
          <Form.Item name="ownerPhoneNumber">
            <Input type="number" size="large" />
          </Form.Item>
          {showFields.ownerPhoneNumber2 ? (
            <Form.Item name="ownerPhoneNumber2">
              <Input type="number" size="large" />
            </Form.Item>
          ) : (
            <AddAnotherNumber
              onClick={() => {
                setShowFields((p) => ({
                  ...p,
                  ownerPhoneNumber2: true,
                }));
              }}
            />
          )}
        </TableForm.Item>
        <TableForm.Item label="Email Id">
          <Form.Item
            name="emailId"
            rules={[
              { required: true, message: "Required field" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
        </TableForm.Item>
        <TableForm.Item label="Type">
          <TypeSelector />
        </TableForm.Item>
        <TableForm.Item label="Food Catagories">
          <FoodCategorySelector />
        </TableForm.Item>
      </TableForm.Layout>
    </Form>
  );
};

export default RestaurantForm;
