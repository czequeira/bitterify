import http from 'http';
import fs from 'fs';
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

  const httpServer = http.createServer((req, res) => {
    if (req.url === '/') {
      const html = `<!DOCTYPE html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      </head>
      <body>
         <div id="app" /><script>${compiled}</script>
      </body>`;
      res.write(html);
      res.end();
    } else {
      fs.readFile(`public${req.url}`, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
        } else {
          res.writeHead(200);
          res.end(data);
        }
      });
    }
  });

  httpServer.listen(port, () => {
    console.log(`bitterify server running at port ${port}`);
  });
}

export async function watch(file = 'src/index.ts', out: string) {
  function bundle() {
    console.log('compiling...');

    b.bundle(function (err, buf) {
      if (err) throw err;
      fs.writeFile(out, buf.toString(), (err) => {
        if (err) throw err;
        console.log('saved');
      });
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
}

export async function build(file = 'src/index.ts', out: string) {
  function bundle() {
    console.log('compiling...');

    b.bundle(function (err, buf) {
      if (err) throw err;
      fs.writeFile(out, buf.toString(), (err) => {
        if (err) throw err;
        console.log('saved');
      });
      console.log('compiled');
    });
  }

  const b = browserify().add(file).plugin(tsify).plugin('tinyify');

  bundle();
}
