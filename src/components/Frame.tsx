import React from 'react'
import { MenuProps } from 'antd';
import { Link, Outlet } from 'react-router-dom';

import { Layout } from 'du-react-common';
import 'du-react-common/lib/index.css';

// import { Layout } from '../../lib/index'
// import '../../lib/index.css';

// import Layout from '@/components/common/Layout'

const menus: MenuProps['items'] = [
  {
    label: <Link to='login'>登录</Link>,
    key: 'login',
  },
  {
    label: <Link to='profile'>个人信息</Link>,
    key: 'profile',
  },
  {
    label: "功能1",
    key: 'utils_1',
  }
]


export default function Frame() {
  return (
    <Layout
      title='测试' 
      menuItems={menus}
      logo="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      >
      <Outlet />
    </Layout>
  )
}
