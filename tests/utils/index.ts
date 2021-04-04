import jsdomGlobal from 'jsdom-global';
import { JSDOM } from 'jsdom';
import browserify from 'browserify';
import tsify from 'tsify';

jsdomGlobal();

export async function mount(
  file: string,
  mountPoint = 'app',
): Promise<Document> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';

    browserify()
      .add(file)
      .plugin(tsify)
      .bundle(function (err, buf) {
        if (err) return reject(err);
        script.text = buf.toString();

        const dom = new JSDOM(`<!DOCTYPE html><div id="${mountPoint}" />`, {
          runScripts: 'dangerously',
        });
        dom.window.document.body.appendChild(script);
        resolve(dom.window.document);
      });
  });
}
