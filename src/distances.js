#!/usr/bin/env node

import { createWriteStream, readFileSync } from 'fs';
import Papa from 'papaparse';
import { distanceEdges } from './distance-edges.js';

const NODES = process.argv[2];
const TARGET_KEY = process.argv[3]; // Cell Type
const TARGET_VALUE = process.argv[4]; // Endothelial
const MAX_DIST = parseFloat(process.argv[5]); // 1000
const OUTPUT = process.argv[6];

const nodes = Papa.parse(readFileSync(NODES).toString(), {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
}).data;

const out = createWriteStream(OUTPUT);
for (const row of distanceEdges(nodes, TARGET_KEY, TARGET_VALUE, MAX_DIST)) {
  out.write(row.join(',') + '\n');
}
out.end();
