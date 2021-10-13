import React from "react"
import { Table, Input, Button, Space, DatePicker } from 'antd';

import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker


const Users = ({ stateMachine, sendToStateMachine }) => {
  const { users, request } = stateMachine.context
  console.log(request)

  const getColumnSearchProps = (param, dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //   searchInput = node;
          // }}
          // allowClear
          placeholder={`Поиск по ${dataIndex}`}
          value={request.value}
          // onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onChange={e => sendToStateMachine({type: "SET_SEARCH_PARAMS", value: {
            [param]: e.target.value }
           })}
          onPressEnter={() => sendToStateMachine({ type: "SEARCH" })}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => sendToStateMachine({ type: "SEARCH" })}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Найти
          </Button>
          {/* <Button onClick={() => sendToStateMachine({type: "CLEAR_SEARCH_PARAMS" })} size="small" style={{ width: 90 }}>
            Отмена
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    
    render: text => text
  })

  const columns = [
      {
        title: 'Фамилия',
        dataIndex: 'lastName',
        key: 'lastName',
        width: '30%',
        ...getColumnSearchProps('lastName' ,'фамилии'),
      },
      {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName',
        width: '20%',
        ...getColumnSearchProps('firstName' ,'имени'),
      },
      {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
        ...getColumnSearchProps('phone', 'телефону'),
      },
      {
        title: 'Почта',
        dataIndex: 'email',
        key: 'email',
        ...getColumnSearchProps('email',  'почте'),
      },

    ];

  return (
    <>
      <div style={{
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 28
      }}>
        Пользователи
      </div>

      <div style={{
        paddingTop: 20
      }} />
      <RangePicker onChange={e => {
        if (!e) {
          return
        }
        const createdAtAfter = new Date(e[0]).toISOString()
        const createdAtBefore = new Date(e[1]).toISOString()
        sendToStateMachine({type: "SET_SEARCH_PARAMS", value: {
            createdAtBefore, createdAtAfter
         }
        })
        sendToStateMachine({ type: "SEARCH" })
      }}
      />

      <div style={{
        paddingTop: 20
      }} />
      <Table columns={columns} dataSource={users} pagination={false} loading={stateMachine.matches("searching")}/>
    </>
  )
}

export default Users