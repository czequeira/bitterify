import http from 'http';
import browserify from 'browserify';
import tsify from 'tsify';

async function compile(): Promise<string> {
  return new Promise((resolve, reject) => {
    browserify()
      .add('tests/components/scripts/button.ts')
      .plugin(tsify)
      .bundle(function (err, buf) {
        if (err) return reject(err);
        resolve(buf.toString());
      });
  });
}

const httpServer = http.createServer(async (_, res) => {
  const compiled = await compile();
  const html = `<!DOCTYPE html><div id="app" /><script>${compiled}</script>`;
  res.write(html);
  res.end();
});

httpServer.listen(8080, () => {
  console.log('bitterify server running');
});
