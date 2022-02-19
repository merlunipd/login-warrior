import loadDataset from './modules/loadDataset.js';
import { createDB, deleteDB, readDB, updateDB } from '../../shared/modules/indexdDB.js';

const datasetInput = document.querySelector('#datasetInput');
const datasetButton = document.querySelector('#datasetButton');
const plotList = document.querySelector("#plot-list");

datasetButton.addEventListener('click', async () => {
  datasetInput.click();
});

datasetInput.addEventListener('change', async () => {
  const file = datasetInput.files[0];
  if (file !== undefined) {
    const data = await loadDataset(file);

    await deleteDB();
    await createDB();
    await updateDB(data);

    plotList.style.display = "block";
  } else {
    plotList.style.display = "none";
  }
});
