import React, { useState } from 'react'
import {UserOutlined, HomeOutlined, SettingOutlined, OpenAIFilled  } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme, Button, Input } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const {Content, Sider, Header } = Layout
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
      {
        key:'/logout',
        label:'Logout',
        icon:<AiOutlineLogout/>,
        onClick: ()=>{
            let conf = window.confirm("Apakah anda ingin Logout")
            if (!conf) {
                return
            }
        supabase.auth.signOut()
        .then((res)=>{
        alert("Anda berhasil Logout")
        })
        },
        style: {
         marginTop:"auto"
        }
    }
    ]
 
  return (
    <main>
      {/* left side */}
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ overflow: 'hidden' }}>
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
        <Layout>
          <Header 
          className='bg-white flex items-center'>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className='text-base w-[64px]'
            />
            <Breadcrumb style={{ marginLeft: '16px' }}>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              {location.pathname !== '/' && (
                <Breadcrumb.Item>
                  {items.find(item => item.key === location.pathname)?.label}
                </Breadcrumb.Item>
              )}
            </Breadcrumb>
          </Header>
          <Content
            className='p-6 m-0'
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'hidden',
              height: 'calc(100vh - 64px)', // Adjust height to fit screen
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