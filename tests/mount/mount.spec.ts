import jsdomGlobal from 'jsdom-global';
import { JSDOM } from 'jsdom';
import browserify from 'browserify';
import tsify from 'tsify';

jsdomGlobal();

test('test', async (done) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  // script.text = `document.querySelector('p').innerHTML = 'HOLA'`;

  browserify()
    .add('tests/static/requires.ts')
    .plugin(tsify)
    .bundle(function (err, buf) {
      if (err) console.error(err);
      const compiled = buf.toString();
      const index = compiled.search('¿');

      const compiledBegin = compiled.substring(0, index);
      const compiledEnd = compiled.substring(index + 1);
      const code = `
      const n = createComponent('p', 'Hello world');
      createApp(n);
      `;
      script.text = compiledBegin + code + compiledEnd;

      const dom = new JSDOM(`<!DOCTYPE html><div id="app" />`, {
        runScripts: 'dangerously',
      });
      dom.window.document.body.appendChild(script);

      expect(dom.window.document.querySelector('p')?.innerText).toBe(
        'Hello world',
      );
      done();
    });
});
