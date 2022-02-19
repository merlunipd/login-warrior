import loadDataset from './modules/loadDataset.js';
import { createDB, deleteDB, readDB, updateDB } from '../../shared/modules/indexdDB.js';
import { loadSession } from '../../shared/modules/session.js';

const datasetInput = document.querySelector('#datasetInput');
const datasetButton = document.querySelector('#datasetButton');
const loadSessionButton = document.querySelector('#load-session-button');
const loadSessionInput = document.querySelector('#load-session-input');
const plotList = document.querySelector("#plot-list");

datasetButton.addEventListener('click', () => {
  datasetInput.click();
});

datasetInput.addEventListener('change', async () => {
  const file = datasetInput.files[0];
  if (file !== undefined) {
    const data = await loadDataset(file);

    const session = {
      data: data,
      configuration: undefined
    };

    await deleteDB();
    await createDB();
    await updateDB(session);

    plotList.style.display = "block";
  } else {
    plotList.style.display = "none";
  }
});

loadSessionButton.addEventListener("click", () => {
  loadSessionInput.click();
});

loadSessionInput.addEventListener('change', async () => {
  const file = loadSessionInput.files[0];
  if (file !== undefined) {
    const session = await loadSession(file);
    
    console.log(session);

    await deleteDB();
    await createDB();
    await updateDB(session);

    window.location.href = `../..${session.configuration.pathToPage}`;
  }
});