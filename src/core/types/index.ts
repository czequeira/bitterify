import { Component } from '../classes';

export type HtmlElement = HTMLElement | Text;
export type Content = string | (() => string);
export type Fn = (...args: any[]) => any;
export type Child = Component | Content;
