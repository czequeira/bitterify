#!/usr/bin/env node

import { Command } from 'commander';
import { serve } from '../server';
const program = new Command();

program.version(process.env.npm_package_version || '0.0.0');
program
  .command('serve')
  .description('Serve the app')
  .action(() => {
    serve();
  });

program.parse(process.argv);
