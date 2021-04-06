import http from 'http';
import browserify from 'browserify';
import tsify from 'tsify';

export async function serve(port = 8080, file = 'src/index.ts') {
  let compiled = '';
  browserify()
    .add(file)
    .plugin(tsify)
    .bundle(function (err, buf) {
      if (err) throw err;
      compiled = buf.toString();
    });

  const httpServer = http.createServer((_, res) => {
    const html = `<!DOCTYPE html><div id="app" /><script>${compiled}</script>`;
    res.write(html);
    res.end();
  });

  httpServer.listen(port, () => {
    console.log(`bitterify server running at port ${port}`);
  });
}
