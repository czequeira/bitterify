import { Component, ILink, Bind } from '../classes';

export type HtmlElement = HTMLElement | Text;

export type Content = string | ((bind: Bind) => string);

export type Contents = string[] | ((bind: Bind) => string[]);

export type Child = Component | string;

export type Children = Child[] | ((bind: Bind) => Child[]);

export type Fn = (...args: any[]) => any;

export type Callback = () => void | Promise<void>;

export type Links = Array<ILink | string>;

export type Subscriber = Component | ((bind: Bind) => void | Promise<void>);
