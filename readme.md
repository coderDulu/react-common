### websocket 封装
#### 继承自WebSocket类的订阅发布模式
|方法/属性|作用|
|--|--|
|init|初始化websocket连接|
|run|开始监听服务端发送的消息|
|add|添加订阅者|
|addMore|添加多个订阅者|
|request|向服务器发送请求|
|remove|移除订阅|
|clear|清空订阅|
|event|缓存订阅者|
|backCommon|在连接未成功的时候缓存，等待连接成功后在执行指令|

#### 使用方法
~~~js
import ws from './websocket';
// 连接服务器
ws.init('parameter', () => {
  console.log('连接成功')
});
ws.run() // 开启监听服务器响应
ws.request(JSON.parse({
  name: 'test';
})); // 发送消息
ws.add('test', (res) => {
  console.log('res => ', res);
})
~~~