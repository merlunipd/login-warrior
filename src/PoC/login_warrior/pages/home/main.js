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
    const sessionData = {
      plotName: undefined,
      plotConfiguragione: undefined,
      data: data
    };

    await deleteDB();
    await createDB();
    await updateDB(sessionData);

    plotList.style.display = "block";
  } else {
    plotList.style.display = "none";
  }
});

const dataDB = await readDB();
if(dataDB.plotName) {
  if(confirm("Ripristinare sessione esistente?")) {
    window.location.href = `../${dataDB.plotName}` ;
  }
}
