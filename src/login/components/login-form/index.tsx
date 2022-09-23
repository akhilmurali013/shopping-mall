import React from "react";

import { useNavigate } from "react-router-dom";

import { Button, Form, Input } from "antd";

import useUserStore from "common/store/useUserStore";

import "./styles.less";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const [form] = Form.useForm<LoginFormValues>();

  const onFinish = (values: LoginFormValues) => {
    setUserDetails({
      isAuthenticated: true,
      firstName: "Thanveer",
      lastName: "Gopal",
      email: values.email,
    });
    navigate("/a");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      className="form"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Invalid email" },
        ]}
      >
        <Input size="large" placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input size="large" type="password" />
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" size="large">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
