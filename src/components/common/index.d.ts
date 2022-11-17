export { default as AutoScroll } from './AutoScroll';
export { default as Layout } from './Layout';
export { default as utils } from './utils';
export { default as Ws } from './websocket';

interface WsAddType {
  type: string;
  fn: () => {};
}

interface requestType {
  name: string;
  action?: string;
  value?: object;
}


export namespace utils {
  function getTime(): string;
  function objValToStr(obj: object): object;
}

export class Ws {
  constructor(url: string);
  event: any;
  backCommon: string[];
  _init(fn?: () => void): this;
  _run(): void;
  _listen(): void;
  /**
   * 添加事件订阅
   * @param type 订阅名
   * @param fn 对应的回调
   */
  add(type: string, fn: (res: any) => void): void;
  addMore(typeObj: WsAddType[]): void;
  request(params: requestType): void;
  remove(type: string, fn?: Function): void;
  clear(): void;
}