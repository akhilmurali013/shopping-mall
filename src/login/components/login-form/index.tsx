import React from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "antd";
import * as yup from "yup";

import Container from "common/components/container";

import "./styles.less";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register } = useForm<LoginFormValues>({
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required(),
      })
    ),
  });

  return (
    <form>
      <Container label="Email">
        <Input
          size="large"
          placeholder="Enter your email"
          {...register("email")}
        />
      </Container>
      <Container label="Password" className="password-container">
        <Input size="large" type="password" {...register("password")} />
      </Container>
      <Button block type="primary" htmlType="submit" size="large">
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
