import { Component, ILink, IScript } from '../classes';

export type HtmlElement = HTMLElement | Text;
export type Content = string | (() => string);
export type Fn = (...args: any[]) => any;
export type Child = Component | Content;
export type Links = Array<ILink | string>;
export type Scripts = Array<IScript | string>;
