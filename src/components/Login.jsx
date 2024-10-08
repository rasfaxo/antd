import React, { useState } from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import { LockOutlined, MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import supabase from "../connector";
import AlertMessage from "./Alert";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  

  async function handleSubmit(e) {
    setLoading(true);
    let { email, password } = e;
    
    const {data: user, error: fetchError} = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

    if (fetchError || !user) {
      setLoading(false);
      setError(true);
      message.error("Pengguna tidak ditemukan, silahkan mendaftar terlebih dahulu");
      return;
    }

    const {error : signInError} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // setLoading(false);
    if (signInError) {
      setLoading(false);
      setError(true);
      message.error("Email atau Password salah");
    } else {
      message.success("Berhasil Login");
    }


    // supabase.auth.signInWithPassword({
    //     email: email,
    //     password: password,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setLoading(false);
    //     if (res.error) {
    //       setError(true);
    //     }
    //   });
  }

  const handleGoogleLogin = async () => {
    const { user,session, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      message.error("Gagal Login dengan Google");
    }
    console.log(user, session);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {
        error && (
          <AlertMessage
            message={"Email or Password is wrong"}
            type={"warning"}
            onClose={()=>{setError(false)}}
            className="absolute top-10 left-4"
          />
        )
      }
      <Form
        className="w-96 p-6 bg-white rounded-md shadow-md"
        layout="vertical"
        onFinish={handleSubmit}
      >
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
          <Input prefix={<MailOutlined />} placeholder="Email" />
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
          <Button block="true" type="primary" htmlType="submit" loading={loading} disabled={loading}>
            Log in
          </Button>
          <Button
            block
            icon={<GoogleOutlined />}
            onClick={handleGoogleLogin}
            disabled={loading}
            style={{ marginTop: '10px' }}
          >
            Sign in with Google
          </Button>
          <div
            style={{ marginTop: "1rem", textAlign: "center", width: "100%" }}
          >
            <span style={{ color: "#333" }}>Don't have an account?</span>{" "}
            <NavLink to="/register">Sign up now</NavLink>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;