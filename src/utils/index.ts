import { Content } from '../core/types';

export function getString(content: Content): string {
  let textContent = '';

  if (typeof content === 'string') textContent = content;
  else textContent = content();

  return textContent;
}
