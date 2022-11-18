# 基于antd的Header、Main、Footer布局模板

## 主要功能

- 基于antd，用于快速构建一个上中下的布局

## 参数

| 属性              | 描述                                      |
| ----------------- | ----------------------------------------- |
| title（必传）     | 标题                                      |
| menuItems（必传） | 菜单对象：antd的MenuProps['items'][] 类型 |
| footer （可选）   | footer底部文字                            |
| logo  （可选）    | 图片链接                                  |
| children （必传） | Main部分，可传任意元素（必须）            |
## 使用方式

#### 例子：

```tsx
// 使用路由示例，基于antd模块和样式
/* 路由构成
  <Route path='/' element={<Frame />}>
    <Route index element={<Login />} />
    <Route index path='login' element={<Login />} />
    <Route index path='profile' element={<Profile />} />
  </Route>
*/
import React from 'react'
import { MenuProps } from 'antd';
import { Link, Outlet } from 'react-router-dom';

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
```
