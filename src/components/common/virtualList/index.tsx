import React, { ReactHTMLElement, ReactNode, useEffect, useReducer, useRef } from 'react'

interface initDataType {
  scrollBoxHeight: number;
  renderList: any[];
  itemHeight: number;
  bufferCount: number;
  renderCount: number;
  start: number;
  end: number;
}
const list = Array(1000).fill(0).map((_, index) => index);

const initData: initDataType = {
  scrollBoxHeight: 500, /* 容器高度(初始化高度) */
  renderList: [],       /* 渲染列表 */
  itemHeight: 80,       /* 每一个列表高度 */
  bufferCount: 6,       /* 缓冲个数 */
  renderCount: 0,       /* 渲染数量 */
  start: 0,             /* 起始索引 */
  end: 0                /* 终止索引 */
}


function reducer(state: initDataType, action: { type: string, payload: any }) {
  switch (action.type) {
    case 'set': {
      return {
        ...state,
        ...action.payload,
      }
    }
  }
}

export default function Index() {
  const [state, dispatch] = useReducer(reducer, initData);
  const listBox = useRef<HTMLDivElement | null>(null);
  const scrollContent = useRef<HTMLDivElement | null>(null);
  // 获取数据
  const { scrollBoxHeight, itemHeight, bufferCount, start, end, renderCount } = state;
  // 截取需要渲染的数组列表
  const renderList = list.slice(start, end);

  // 设置基本参数
  useEffect(() => {
    const scrollBoxHeight = listBox.current!.offsetHeight;  // 获取容器高度

    const renderCount = Math.ceil(scrollBoxHeight / itemHeight) + bufferCount;
    const end = renderCount + 1;

    // 设置容器高度、数据截取结束下标、渲染个数
    dispatch({
      type: 'set',
      payload: {
        scrollBoxHeight,
        end,
        renderCount
      }
    })
  }, [])

  function handleScroll(e: any) {
    const scrollTop = e.target.scrollTop;
    
    const currentOffset = scrollTop - (scrollTop % itemHeight); // 显示区域移动量

    scrollContent.current!.style.transform = `translate3d(0, ${currentOffset}px, 0)`;

    // example：110 / 60 -> 1.8 < 2 => 1
    const start = Math.floor(scrollTop / itemHeight); 
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
    
    dispatch({
      type: 'set',
      payload: {
        start,
        end
      }
    })
  }


  return (
    <div ref={listBox} style={{height: '100%'}}>
      <div onScroll={handleScroll} style={{ height: scrollBoxHeight, overflow: 'auto', position: 'relative' }}>
        {/* 占位区域，生成滚动条 */}
        <div style={{ height: `${list.length * itemHeight}px`, position: 'absolute', left: 0, top: 0, right: 0 }} />
        {/* 显示区域 */}
        <div ref={scrollContent} style={{ position: 'relative', left: 0, top: 0, right: 0 }}>
          {
            renderList.map((item, index) => {
              return <div style={{ backgroundColor: '#ccc', margin: '1px 0', height: '80px' }} key={index}>{item}</div>
            })
          }
        </div>
      </div>
    </div>
  )
}
