import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import logo from "../../assets/img/sibdev-logo.png";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import { Redirect } from "react-router-dom";

const LoginForm = (props) => {
  return (
    <Form
      name="normal_login"
      className={style.login_form}
      initialValues={{
        remember: true,
      }}
      onFinish={props.onSubmit}
    >
      <Form.Item
        name="login"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={style.login_form_button}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

const Login = (props) => {
  const onSubmit = (data) => {
    console.log(data);
    props.login(data);
  };
  if (props.isAuth) {
    return <Redirect to="/page" />;
  }
  return (
    <div className={style.login}>
      <img className={style.login_img} src={logo} alt="" />
      <div className={style.login_title}>Вход</div>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
