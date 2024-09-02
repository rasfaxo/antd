import React, { useState } from "react";
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  OpenAIFilled,
  RightOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, Input } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import supabase from "../connector";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { Content, Sider, Header } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const itemsTop = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "/mahasiswa",
      icon: <UserOutlined />,
      label: "Data Mahasiswa",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  const itemsBottom = [
    {
      key: "/logout",
      label: "Logout",
      icon: <AiOutlineLogout />,
      onClick: () => {
        let conf = window.confirm("Apakah anda ingin Logout");
        if (!conf) {
          return;
        }
        supabase.auth.signOut().then((res) => {
          alert("Anda berhasil Logout");
          navigate("/");
        });
      },
      style: {
        marginTop: "260px",
        position: "absolute",
        bottom: 0,
      },
    },
  ];

  return (
    <main>
      {/* left side */}
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ overflow: "hidden" }}
        >
          <div className="p-7 text-center flex items-center justify-center gap-1">
            <OpenAIFilled className="text-white text-2xl" />
            <h1 className={`text-white text-2xl ${collapsed ? "hidden" : ""}`}>
              ChatGPT.
            </h1>
          </div>

          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[location.pathname]}
            className="h-full"
            items={itemsTop}
            onClick={({ key }) => navigate(key)}
          />
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            className="h-full"
            items={itemsBottom}
          />
        </Sider>
        {/* right side */}
        <Layout>
          <Header className="bg-white flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-base w-[64px]"
            />
            <Breadcrumb
              className="ml-4 font-semibold"
              separator={<RightOutlined className="text-gray-400 size-3" />}
            >
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              {location.pathname !== "/" && (
                <Breadcrumb.Item>
                  {
                    itemsTop.find((item) => item.key === location.pathname)
                      ?.label
                  }
                </Breadcrumb.Item>
              )}
            </Breadcrumb>
          </Header>

          <Content
            className="p-6 m-0"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: "hidden",
              height: "calc(100vh - 64px)",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </main>
  );
};

export default MainLayout;
