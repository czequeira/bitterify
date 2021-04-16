import http from 'http';
import browserify from 'browserify';
import tsify from 'tsify';
import watchify from 'watchify';

export async function serve(port = 8080, file = 'src/index.ts') {
  let compiled = '';
  function bundle() {
    console.log('compiling...');

    b.bundle(function (err, buf) {
      if (err) throw err;
      compiled = buf.toString();
      console.log('compiled');
    });
  }

  const b = browserify()
    .add(file)
    .plugin(tsify)
    .plugin(watchify, {
      delay: 100,
      ignoreWatch: ['**/node_modules/**'],
      poll: false,
    })
    .on('update', bundle);

  bundle();

  const httpServer = http.createServer((_, res) => {
    const html = `<!DOCTYPE html><div id="app" /><script>${compiled}</script>`;
    res.write(html);
    res.end();
  });

  httpServer.listen(port, () => {
    console.log(`bitterify server running at port ${port}`);
  });
}
