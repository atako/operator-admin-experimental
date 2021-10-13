import React, { useEffect, useState, Suspense } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

import initAmplify from './config/initAmplify'
import { appMachine } from './stateMachine/index'
import { Dropdown, Avatar, Menu, Row, Col } from 'antd'

const Layout = React.lazy(() => import("./components/Layout"))

import { UserOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

const { Header } = Layout

const App = () => {
  const [isInit, setIsInit] = useState(true)
  const { logout, getAccessTokenSilently } = useAuth0()
 
  useEffect(async () => {
    const accessToken = await getAccessTokenSilently()
    initAmplify({ accessToken })
    setIsInit(false)
  }, [])

  return (
    <div>
      {isInit ? "Loading" : 
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
      </Suspense>
       }
    </div>
  )
}

export default withAuthenticationRequired(App, {})
