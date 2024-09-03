import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import supabase from "../connector";
import AlertMessage from "./Alert";

const Register = () => {
  const [errPass, setErrPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    setLoading(true);
    let { email, password, repassword } = e;
    if (password !== repassword) {
      setErrPass(true);
      setLoading(false);
      return;
    }

    const {error: signUpError } = await supabase.auth.signUp({ 
      email: email, 
      password: password 
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('users')
      .insert([{ email: email }]);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setSuccess(true);
    message.success("Registrasi berhasil. Silakan cek email Anda untuk verifikasi.");
  }

  useEffect(() => {
    if (errPass || success || error) {
      const timer = setTimeout(() => {
        setErrPass(false);
        setSuccess(false);
        setError(null);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [errPass, success, error]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {
        errPass && (
            <AlertMessage
          message={"Password not match"}
          type={"warning"}
          description={"Please check your password"}
          // className="absolute top-10 left-4"
          />
        )
      }
      {
        success && (
          <AlertMessage
            message="Registration success"
            type="success"
            description={"Please check your email to verify your account"}
            // className="absolute top-10 left-4"
          />
        )
      }
      
      <div className="flex bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex-shrink-0 p-8 w-[400px] h-[400px]">
          <img
            src="/src/assets/images/bgRegister.jpg"
            alt="Register"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        {/* form */}
        <div className="p-8 w-[400px] h-[400px]">
          <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
          >
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
                placeholder="Enter your email" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!"
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item
              name="repassword"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm your password"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>
            
            <Form.Item>
              <Button block type="primary" htmlType="submit" disabled={loading}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <div className="mt-4 text-center w-full">
            <span className="text-gray-500 text-sm">Already have an account?</span>
            <NavLink to="/" className="ml-2 text-sm text-blue-500 font-semibold hover:underline cursor-pointer">Sign In</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;