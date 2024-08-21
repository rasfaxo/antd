import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Form className="w-96 p-6 bg-white rounded-md shadow-md" layout="vertical">
        <h1 className="text-4xl font-bold mb-5 text-center">Login</h1>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
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
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a style={{ float: "right" }} href="">
            Forgot password?
          </a>
        </Form.Item>

        <Form.Item style={{ marginBottom: "0px" }}>
          <Button block="true" type="primary" htmlType="submit">
            Log in
          </Button>
          <div style={{ marginTop: "1rem", textAlign: "center", width: "100%" }}>
            <span style={{ color: "#333" }}>Don't have an account?</span>{" "}
            <NavLink to="/register">Sign up now</NavLink>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;