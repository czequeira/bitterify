import jsdomGlobal from 'jsdom-global';
import { JSDOM } from 'jsdom';
import browserify from 'browserify';
import tsify from 'tsify';

jsdomGlobal();
let compiledBegin = '';
let compiledEnd = '';

function compile(): Promise<string> {
  return new Promise((resolve, reject) => {
    browserify()
      .add('./tests/utils/import.ts')
      .plugin(tsify)
      .bundle(function (err, buf) {
        if (err) return reject(err);
        resolve(buf.toString());
      });
  });
}

beforeAll(async () => {
  const compiled = await compile();
  const compiledArray = compiled.split('¿');
  if (compiledArray.length !== 2) throw new Error('something bad');
  compiledBegin = compiledArray[0];
  compiledEnd = compiledArray[1];
});

function createScript(code: string): string {
  return `${compiledBegin}
  ${code}
  ${compiledEnd}`;
}

export async function mount(
  code: string,
  mountPoint = 'app',
): Promise<Document> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';

    script.text = createScript(code);

    const dom = new JSDOM(`<!DOCTYPE html><div id="${mountPoint}" />`, {
      runScripts: 'dangerously',
    });
    dom.window.document.body.appendChild(script);
    resolve(dom.window.document);
  });
}
