import { JSDOM } from 'jsdom';

test('test', () => {
  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  expect(dom.window.document.querySelector('p')?.textContent).toBe(
    'Hello world',
  );
});
