import '@material/web/select/filled-select.js';
import '@material/web/select/select-option.js';

async function getDatasets() {
  return fetch('datasets.json').then((r) => r.json());
}

function setDataset(dataset) {
  const $vis = document.getElementById('vis');
  for (const attr of Object.keys(dataset)) {
    $vis.setAttribute(attr, dataset[attr])
  }
}

async function setupDatasetsDropdown() {
  const datasets = await getDatasets();

  const $datasets = document.getElementById('dataset-input');
  $datasets.innerHTML = datasets
    .map(
      ({ label }) => `<md-select-option>
        <div slot="headline">${label}</div>
        </md-select-option>`
    )
    .join('\n');

  $datasets.addEventListener('change', (e) => {
    const dataset = datasets[$datasets.selectedIndex];
    setDataset(dataset);
  });

  const startingDataset = Math.floor(Math.random() * datasets.length);
  setDataset(datasets[startingDataset]);
  setTimeout(() => {
    $datasets.selectIndex(startingDataset);
  }, 50);
}

window.addEventListener('DOMContentLoaded', setupDatasetsDropdown);
