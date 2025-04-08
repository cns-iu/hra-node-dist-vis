import { existsSync, readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import Papa from 'papaparse';
import { dirname, join } from 'path';

const CSV_FILES = 'image-store/vccf-data-cell-nodes/published/*/*-nodes.csv';
const CELL_SUMMARIES = 'docs/sc-proteomics-cell-summaries.json';
const CELL_DATASETS = 'docs/sc-proteomics-dataset-metadata.csv';

/**
 * Normalize a csv url for downloading
 * 
 * @param {string} url 
 * @returns normalized url for downloading a csv
 */
function normalizeCsvUrl(url) {
  if (url.startsWith('https://docs.google.com/spreadsheets/d/') && url.indexOf('export?format=csv') === -1) {
    const splitUrl = url.split('/');
    if (splitUrl.length === 7) {
      const sheetId = splitUrl[5];
      const gid = splitUrl[6].split('=')[1];
      return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
    }
  }
  return url;
}

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

/**
 * Get a cell summary for an array of cells
 * 
 * @param {object[]} rows 
 * @param {object} crosswalk 
 * @returns cell summaries in json-ld format
 */
function getSummary(rows, crosswalk) {
  const dist = rows.reduce((acc, r) => ((acc[r['Cell Type']] = (acc[r['Cell Type']] || 0) + 1), acc), {});
  return Object.entries(dist)
    .sort((a, b) => b[1] - a[1])
    .map(([cell_label, count]) => ({
      '@type': 'CellSummaryRow',
      cell_id: normalizeCellType(crosswalk[normalizeCellType(undefined, cell_label)], cell_label),
      cell_label,
      count,
      percentage: count / rows.length,
    }));
}

/**
 * Cache for parsed crosswalks
 */
const crosswalkCache = {};

/**
 * Read a crosswalk from a URL and return a label -> term mapping object
 * 
 * @param {string} url 
 * @returns object
 */
async function getCrosswalk(url) {
  if (crosswalkCache[url]) {
    return crosswalkCache[url];
  } else {
    const req = await fetch(url);
    if (req.ok) {
      const csvText = await req.text();
      const rows = Papa.parse(csvText, { skipEmptyLines: true }).data;
      const headerRow = rows.findIndex((row) => row.includes('Cell Type'));
      const header = rows[headerRow] ?? [];
      const labelIndex = header.indexOf('Cell Type');
      const clIndex = header.indexOf('CL ID');
      const crosswalk = {};
      for (const row of rows.slice(headerRow+1)) {
        const cellLabel = normalizeCellType(undefined, row[labelIndex]);
        crosswalk[cellLabel] = row[clIndex];
      }
      crosswalkCache[url] = crosswalk;
      return crosswalk;
    } else {
      return {};
    }
  }
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

    const crosswalkFile = join(dirname(nodesFile), 'crosswalk.url');
    let crosswalk = {};
    if (existsSync(crosswalkFile)) {
      const url = normalizeCsvUrl(readFileSync(crosswalkFile, 'utf-8').trim());
      crosswalk = await getCrosswalk(url);
    }

    results.push({
      '@type': 'CellSummary',
      cell_source: dataset['@id'],
      annotation_method: 'sc_proteomics',
      modality: 'sc_proteomics',
      summary: getSummary(nodes, crosswalk),
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
