import { createComponent } from '../core';
import { Component } from '../core/classes';
import { BitterifyError } from '../core/errors';
import { Content } from '../core/types';

function row(isHeader: boolean, ...contents: Content[]): Component {
  return createComponent(
    'tr',
    undefined,
    contents.map((i) => createComponent(isHeader ? 'th' : 'td', i)),
  );
}

export const tr = (contents: Content[]) => row(false, ...contents);
export const trh = (contents: Content[]) => row(true, ...contents);

export function table(
  head: Component,
  body: Component[],
  footer?: Component,
): Component {
  if (head.getHtmlType() !== 'tr')
    throw new BitterifyError('the head must be a tr');
  if (footer && footer.getHtmlType() !== 'tr')
    throw new BitterifyError('the footer must be a tr');
  body.forEach((i) => {
    if (i.getHtmlType() !== 'tr')
      throw new BitterifyError('all components body must be tr');
  });

  const tableComponents = [
    createComponent('thead', undefined, [head]),
    createComponent('tbody', undefined, body),
  ];
  if (footer)
    tableComponents.push(createComponent('tfoot', undefined, [footer]));

  return createComponent('table', undefined, tableComponents);
}
