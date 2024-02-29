#!/usr/bin/env node
import { build, context } from 'esbuild';
import inlineWorkerPlugin from 'esbuild-plugin-inline-worker';

const watch = process.argv.slice(-1)[0] === '--watch';

const demo = {
  bundle: true,
  outfile: 'docs/demo.js',
  logLevel: 'info',
  entryPoints: ['src/demo.js'],
  platform: 'browser',
};

const webComponent = {
  bundle: true,
  outfile: 'docs/hra-node-dist-vis.wc.js',
  logLevel: 'info',
  plugins: [inlineWorkerPlugin()],
  entryPoints: ['src/hra-node-dist-vis.js'],
  platform: 'browser',
};

const all = [webComponent, demo];

let ops;
if (watch) {
  ops = all.map(async (options) => (await context(options)).watch());
} else {
  ops = all.map(build);
}

await Promise.all(ops);
