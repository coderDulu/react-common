import React, { useState } from 'react'
import { Layout, Menu, Image, Row, Col, MenuProps } from 'antd'

import './index.less';

import { Outlet } from 'react-router-dom'

interface propsType {
  title: string;
  menuItems: any;
  footer?: any;
  logo?: any;
}

export default function NavBar({ menuItems, footer, title, logo }: propsType) {
  const [current, setCurrent] = useState(menuItems[0].key); // 默认显示菜单

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (

    <div className='layout'>
      {/* 头部 */}
      <header className='header'>
        <Row style={{ width: '100%' }}>
          <Col span={3}>
            <div className='header-info'>
              <Image className='header-logo' src={logo} preview={false} ></Image>
              <h2>{title}</h2>
            </div>
          </Col>
          {/* 菜单 */}
          <Col>
            {menuItems?.length && <Menu onClick={onClick} mode="horizontal" items={menuItems} selectedKeys={[current]}/>}
          </Col>
        </Row>
      </header>
      {/* 内容区 */}
      <main>
        <Outlet />
      </main>
      {/* 底部 */}
      <footer>{footer}</footer>
    </div>

  )
}
