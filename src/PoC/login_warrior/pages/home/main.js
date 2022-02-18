import loadDataset from './modules/loadDataset.js';
import { createDB, deleteDB, readDB, updateDB } from './modules/indexdDB.js';

const datasetInput = document.querySelector('#datasetInput');
const datasetButton = document.querySelector('#datasetButton');

datasetButton.addEventListener('click', async () => {
  datasetInput.click();
});

datasetInput.addEventListener('change', async () => {
  const file = datasetInput.files[0];
  if (file !== undefined) {
    const data = await loadDataset(file);

    deleteDB();
    createDB();
    updateDB(data);
    const dbData = readDB();

    setTimeout(() => {
      console.log(dbData);
    }, 5000);
  }
});
