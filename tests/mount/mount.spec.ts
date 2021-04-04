import jsdomGlobal from 'jsdom-global';
import { JSDOM } from 'jsdom';

jsdomGlobal();

test('test', () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.text = `document.querySelector('p').innerHTML = 'HOLA'`;

  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, {
    runScripts: 'dangerously',
  });
  dom.window.document.body.appendChild(script);

  expect(dom.window.document.querySelector('p')?.textContent).toBe('HOLA');
});
