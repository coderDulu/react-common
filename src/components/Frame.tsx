import React from 'react'
import { MenuProps } from 'antd';
import { useNavigate, Link, Outlet } from 'react-router-dom';

import Layout from '@/components/common/Layout';

const menus: MenuProps['items'] = [
  {
    label: <Link to='login'>登录</Link>,
    key: 'login',
  },
  {
    label: <Link to='profile'>个人信息</Link>,
    key: 'profile',
  }
]


export default function Frame() {
  return (
    <Layout title='测试' menuItems={menus}>
      <Outlet />
    </Layout>
  )
}
