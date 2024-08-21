import React, { useState } from 'react'
import {UserOutlined, HomeOutlined, SettingOutlined, OpenAIFilled  } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'



const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const {Content, Sider } = Layout
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken()

      
    const items = [
      {
        key: '/',
        icon: <HomeOutlined />,
        label: 'Dashboard',
      },
      {
        key: '/mahasiswa',
        icon: <UserOutlined />,
        label: 'Data Mahasiswa',
      },
      {
        key: '/settings',
        icon: <SettingOutlined />,
        label: 'Settings',
      },
    ]
 
  return (
    <main>
      {/* sidebar content */}
      <Layout>
        <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
          width={200}
          style={{
            background: '#001529', 
          }}>
            
          {/* logo */}
          <div className="p-7 text-center flex items-center justify-center gap-1">
            <OpenAIFilled className='text-white text-2xl' />
            <h1 className={`text-white text-2xl ${collapsed ? 'hidden' : ''}`}>
              ChatGPT.
            </h1>
          </div>

          <Menu
            mode="inline"
            theme='dark'
            defaultSelectedKeys={[location.pathname]}
            className='h-full'
            items={items}
            onClick={({ key }) => navigate(key)}
          />
        </Sider>
        
        {/* right side */}
        <Layout className='p-6 h-screen'>
            {/* breadcrumb untuk menampilkan path */}
          <Breadcrumb className='m-4 mb-7'>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            {location.pathname !== '/' && (
              <Breadcrumb.Item>
                {items.find(item => item.key === location.pathname)?.label}
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
          {/* main content */}
          <Content className='p-6 m-0 min-h-[280px]'
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'hidden',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </main>
  )
}

export default MainLayout;