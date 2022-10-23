import React from "react";

import { Form, Input } from "antd";

import Label from "common/components/label";

import "./styles.less";

const BankingDetails: React.FC = () => (
  <div className="banking-details-wrapper">
    <div>
      <Label>Account Name</Label>
      <Form.Item
        name={["bankDetails", "accountName"]}
        rules={[{ required: true, message: "Required field" }]}
      >
        <Input size="large" className="input-box" />
      </Form.Item>
    </div>
    <div>
      <Label>Bank Name</Label>
      <Form.Item
        name={["bankDetails", "bankName"]}
        rules={[{ required: true, message: "Required field" }]}
      >
        <Input size="large" className="input-box" />
      </Form.Item>
    </div>
    <div>
      <Label>Account Number</Label>
      <Form.Item
        name={["bankDetails", "accountNumber"]}
        rules={[{ required: true, message: "Required field" }]}
      >
        <Input size="large" className="input-box" />
      </Form.Item>
    </div>
    <div>
      <Label>IFSC Code</Label>
      <Form.Item
        name={["bankDetails", "ifscCode"]}
        rules={[{ required: true, message: "Required field" }]}
      >
        <Input size="large" className="input-box" />
      </Form.Item>
    </div>
    <div>
      <Label>UPI ID</Label>
      <Form.Item
        name={["bankDetails", "upiId"]}
        rules={[{ required: true, message: "Required field" }]}
      >
        <Input size="large" className="input-box" />
      </Form.Item>
    </div>
  </div>
);

export default BankingDetails;
