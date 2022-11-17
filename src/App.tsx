import React, { useEffect, useState } from 'react';

import AutoScroll from '../lib/AutoScroll/index';
import { utils, Ws } from 'du-react-common';
// import 'du-react-common/lib/index.css';
// import '@/components/common/AutoScroll/index.css';
/* 
const ws = new Ws('ws://127.0.0.1:80');

ws.request({
  name: 'parameter',
  action: 'get'
})
ws.add('parameter', (res: any) => {
  console.log(res)
}) */

let timer = 0;


function App() {
  const [data, setData] = useState('')

  useEffect(() => {
    setInterval(() => {
      setData(data => `${data} ${utils.getTime()} ${timer++} - hello world \n`)
    }, 1000)
  }, [])

  return (
    <div >
      <AutoScroll style={{ width: '300px', border: '1px solid #ccc' }}>
        {data}
      </AutoScroll>
    </div>
  );
}

export default App;
