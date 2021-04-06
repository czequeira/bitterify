#!/usr/bin/env node

import { Command } from 'commander';
import { serve } from '../server';
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

program.parse(process.argv);
