import loadDataset from './modules/loadDataset.js';

const datasetInput = document.querySelector('#datasetInput');
const datasetButton = document.querySelector('#datasetButton');

datasetButton.addEventListener('click', async () => {
  datasetInput.click();
});

datasetInput.addEventListener('change', async () => {
  const file = datasetInput.files[0];
  if (file !== undefined) {
    const data = await loadDataset(file);
    console.log(data);
  }
});
