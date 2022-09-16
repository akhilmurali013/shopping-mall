import React from "react";

import { Typography } from "antd";

import LoginForm from "./components/login-form";
import Logo from "./components/logo";

import "./styles.less";

const { Title, Text } = Typography;

const LoginContentWrapper: React.FC = () => (
  <div className="content-wrapper">
    <div className="content-text">
      <Title level={2}>Log in to your account</Title>
      <Text type="secondary">Welcome back! Please enter your details.</Text>
    </div>
    <LoginForm />
  </div>
);

const LoginView: React.FC = () => (
  <div className="login-container">
    <div className="login-header">
      <div className="content">
        <Logo />
        <Title level={5} className="text-content">
          HiLite Dashboard
        </Title>
      </div>
    </div>
    <div className="login-body">
      <LoginContentWrapper />
    </div>
  </div>
);

export default LoginView;
