import { Component, ILink, Bind } from '../classes';

export type HtmlElement = HTMLElement | Text;

export type Content = string | ((bind: Bind) => string);

export type Fn = (...args: any[]) => any;

export type Child = Component | Content;

export type Links = Array<ILink | string>;

interface ICallbackSubscribed {
  id: string;
  callback: (bind: Bind) => void;
}

export type Subscriber = Component | ICallbackSubscribed;
