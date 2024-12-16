import { existsSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import sh from 'shelljs';

const CLEAN = process.argv.length === 3 && process.argv[2] === '--clean'
// const BASE_URL = 'https://cdn.humanatlas.io';
const BASE_URL = 'http://localhost:5500';
const CSV_FILES = 'image-store/vccf-data-cell-nodes/published/*/*-nodes.csv';
const DATASETS_JSON = 'docs/datasets.json';
const NODE_OPTIONS = '--max-old-space-size=64000';
const DIST_ARGS = "-t 'Endothelial' -d 1000";

const datasets = [];
for (const nodesFile of globSync(CSV_FILES).sort()) {
  const edgesFile = nodesFile.replace('-nodes.csv', '-edges.csv');
  if (!existsSync(edgesFile) || CLEAN) {
    console.log(`extracting edges for ${nodesFile}`);
    // sh.exec(`node ${NODE_OPTIONS} ./src/distances.js ${nodesFile} ${DIST_ARGS} ${edgesFile}`);
    sh.exec(`node ${NODE_OPTIONS} ../hra-ui/dist/libs/node-dist-vis/cli.js generate-edges ${nodesFile} ${DIST_ARGS} -o ${edgesFile}`)
  }

  const numNodes = parseInt(sh.exec(`wc -l ${nodesFile} | cut -d ' ' -f 1`, { silent: true }).toString()) - 1;
  const nodesLabel = nodesFile.split('/').slice(-2).join(' / ').replace('-nodes.csv', '');

  datasets.push({
    label: `${nodesLabel} (${numNodes.toLocaleString()} cells)`,
    nodes: `${BASE_URL}/${nodesFile}`,
    edges: `${BASE_URL}/${edgesFile}`,
    'node-target-key': 'Cell Type',
    'node-target-value': 'Endothelial',
    'max-edge-distance': '1000',
  });
}

writeFileSync(DATASETS_JSON, JSON.stringify(datasets, null, 2));
