import { existsSync, readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import Papa from 'papaparse';

const CSV_FILES = 'image-store/vccf-data-cell-nodes/published/*/*-nodes.csv';
const CELL_SUMMARIES = 'docs/sc-proteomics-cell-summaries.json';
const CELL_DATASETS = 'docs/sc-proteomics-dataset-metadata.csv';

/**
 * Normalize cell type ids, generating one if needed
 *
 * @param {string} id a cell type ID or undefined
 * @param {*} label a cell type label
 * @returns a normalized, ontology friendly cell type id
 */
function normalizeCellType(id, label) {
  if (!id && label) {
    const suffix = label
      .toLowerCase()
      .trim()
      .replace(/\W+/g, '-')
      .replace(/[^a-z0-9-]+/g, '');
    id = `ASCTB-TEMP:${suffix}`; // expands to `https://purl.org/ccf/ASCTB-TEMP_${suffix}`;
  }
  return id;
}

function getSummary(rows) {
  const dist = rows.reduce((acc, r) => ((acc[r['Cell Type']] = (acc[r['Cell Type']] || 0) + 1), acc), {});
  return Object.entries(dist)
    .sort((a, b) => b[1] - a[1])
    .map(([cell_label, count]) => ({
      '@type': 'CellSummaryRow',
      cell_id: normalizeCellType(undefined, cell_label),
      cell_label,
      count,
      percentage: count / rows.length,
    }));
}

const results = [];
for (const nodesFile of globSync(CSV_FILES).sort()) {
  const datasetFile = nodesFile.replace('-nodes.csv', '-dataset.json');
  if (existsSync(datasetFile)) {
    const dataset = JSON.parse(readFileSync(datasetFile));
    const nodes = Papa.parse(readFileSync(nodesFile).toString(), {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    }).data;

    results.push({
      '@type': 'CellSummary',
      cell_source: dataset['@id'],
      annotation_method: 'sc_proteomics',
      modality: 'sc_proteomics',
      summary: getSummary(nodes),
    });
  }
}

writeFileSync(CELL_SUMMARIES, JSON.stringify(results, null, 2));

const datasets = results.map((summary) => ({
  donor_id: `${summary['cell_source']}$TEMP_DONOR`,
  block_id: `${summary['cell_source']}$TEMP_BLOCK`,
  dataset_id: summary['cell_source'],
}));

writeFileSync(CELL_DATASETS, Papa.unparse(datasets, { header: true }));
