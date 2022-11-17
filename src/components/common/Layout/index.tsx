import React, { useState } from 'react'
import { Layout, Menu, Image, Row, Col, MenuProps } from 'antd'

import styles from './index.module.less';

interface propsType {
  title: string;
  menuItems: any;
  footer?: any;
  logo?: string;
  children: any;
}

export default function NavBar({ menuItems, footer, title, logo, children }: propsType) {
  const [current, setCurrent] = useState(menuItems[0].key); // 默认显示菜单

  const onClick: MenuProps['onClick'] = e => {
    // console.log('click ', e);
    setCurrent(e.key);
  };

  return (

    <div className={styles.layout}>
      {/* 头部 */}
      <header className={styles.header}>
        <Row style={{ width: '100%' }}>
          <Col span={3}>
            <div className={styles['header-info']}>
              <Image className={styles['header-logo']} src={logo} preview={false} ></Image>
              <h2>{title}</h2>
            </div>
          </Col>
          {/* 菜单 */}
          <Col className={styles.menus}>
            {menuItems?.length && <Menu onClick={onClick} mode="horizontal" items={menuItems} selectedKeys={[current]}/>}
          </Col>
        </Row>
      </header>
      {/* 内容区 */}
      <main>
        {children}
      </main>
      {/* 底部 */}
      <footer>{footer}</footer>
    </div>

  )
}
