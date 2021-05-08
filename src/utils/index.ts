import { Bind } from '../core/classes/bind.class';
import { BitterifyError } from '../core/errors';
import { Child, Content } from '../core/types';

// TODO: resolve the errors theme
export function getString(content: Content, bind: Bind | undefined): string {
  if (typeof content === 'string') return content;
  if (bind) return content(bind);
  throw new BitterifyError('some error');
}

export function getChild(
  child: Child | ((bind: Bind) => Child),
  bind: Bind | undefined,
): Child {
  if (typeof child !== 'function') return child;
  if (bind) return child(bind);
  throw new BitterifyError('other error');
}

export function getChildren(
  children: Child[] | ((bind: Bind) => Child[]),
  bind: Bind | undefined,
): Child[] {
  if (typeof children !== 'function') return children;
  if (bind) return children(bind);
  throw new BitterifyError('other error');
}

export function getStrings(
  strings: string[] | ((bind: Bind) => string[]),
  bind: Bind | undefined,
): string[] {
  if (typeof strings !== 'function') return strings;
  if (bind) return strings(bind);
  throw new BitterifyError('other error');
}
