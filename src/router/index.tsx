import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import Login from '@/pages/Login';
import Frame from '@/components/Frame';
import Profile from '@/pages/Profile';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Frame />}>
      <Route index element={<Login />} />
      <Route index path='login' element={<Login />} />
      <Route index path='profile' element={<Profile />} />
    </Route>
  )
)


export default function index() {
  return (
    <RouterProvider router={router} />
  )
}
