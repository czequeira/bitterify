import { getString } from '../../utils';
import { Bind } from '../classes';
import { Content, HtmlElement } from '../types';

export function refreshContent(
  htmlElement: HtmlElement,
  content: Content,
  bind: Bind,
): void {
  if (htmlElement instanceof HTMLElement)
    htmlElement.innerText = getString(content, bind);
  else htmlElement.textContent = getString(content, bind);
}
