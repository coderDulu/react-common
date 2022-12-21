import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/antd.css';

import App from './App';
import App2 from './App2';
import App3 from './App3';


const root = document.getElementById('root');
if(root) {
  // createRoot(root).render(<App />)
  createRoot(root).render(<App2 />)
  // createRoot(root).render(<App3/>)
}
