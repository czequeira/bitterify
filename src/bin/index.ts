#!/usr/bin/env node

import { Command } from 'commander';
import { build, serve, watch } from '../server';
const program = new Command();

program.version(process.env.npm_package_version || '0.0.0');
program
  .command('serve')
  .description('Serve the app')
  .option('-p, --port <port>', 'Port to serve de app', '8080')
  .option('-f, --file <file>', 'File to compile', 'src/index.ts')
  .action(({ port, file }) => {
    serve(port, file);
  });

program
  .command('watch')
  .description('compile in develpment mode')
  .option('-f, --file <file>', 'File to compile', 'src/index.ts')
  .option('-o, --out <out>', 'file to save')
  .action(({ file, out }) => {
    watch(file, out);
  });

program
  .command('build')
  .description('compile in production mode')
  .option('-f, --file <file>', 'File to compile', 'src/index.ts')
  .option('-o, --out <out>', 'file to save')
  .action(({ file, out }) => {
    build(file, out);
  });

program.parse(process.argv);
