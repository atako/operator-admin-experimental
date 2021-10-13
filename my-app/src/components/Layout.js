import React, { useState } from 'react'
import { useMachine } from '@xstate/react'
import { usersMachine } from "../stateMachine/usersMachine"
import { useAuth0 } from '@auth0/auth0-react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown } from 'antd'
import {
  UserOutlined,
  GiftOutlined,
  UnorderedListOutlined,
  SkinOutlined
} from '@ant-design/icons'

import "../App.css"
import 'antd/dist/antd.css'

// const Users = React.lazy(() => import("./Users"))
import Users from "./Users/Users"

const { Header, Content, Footer, Sider } = Layout



const DashboardLayout = () => {
  const [stateMachine, sendToStateMachine] = useMachine(usersMachine)
  const [collapsed, setCollapsed] = useState(false)
  const { logout } = useAuth0()

  const menu = (
  <Menu>
    <Menu.Item
      onClick={async () => {
        await logout()
        // window.location.reload(false)
      }}
      style={{ color: '#7989dd' }}
    >
      Sing out
    </Menu.Item>
  </Menu>
)


  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(e) => setCollapsed(e)}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/users">Пользователи</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SkinOutlined />}>
              <Link to="/instructors">Инструкторы</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="header-layout">
              <div />
              <Dropdown overlay={menu} trigger={['click']}>
                <Avatar
                  shape="circle"
                  style={{
                    backgroundColor: '#8896dd',
                    float: 'right',
                    margin: '16px auto',
                    cursor: 'pointer',
                  }}
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route path="/users">
                <Users 
                  stateMachine={stateMachine}
                  sendToStateMachine={sendToStateMachine}
                />
              </Route>
              <Route path="/instructors">
                {/* <Categories /> */}
              </Route>
              <Route
                path="/"
                render={() => <Redirect to="/users" />}
                exact={true}
              />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Восьмерка - онлайн тренировки</Footer>
        </Layout>
      </Layout>
    </Router>
  )
}

export default DashboardLayout
