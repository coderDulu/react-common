import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import App2 from './App2';
import 'antd/dist/antd.css';


const root = document.getElementById('root');
if(root) {
  // createRoot(root).render(<App />)
  createRoot(root).render(<App2 />)
}
