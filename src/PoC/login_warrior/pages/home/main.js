// Importa moduli necessari
import loadDataset from './modules/loadDataset.js';
import {
  createDB, deleteDB, updateDB,
} from '../../shared/modules/indexdDB.js';
import { loadSession } from '../../shared/modules/session.js';

// Collega DOM con gli eventi
const datasetInput = document.querySelector('#datasetInput');
const datasetButton = document.querySelector('#datasetButton');
const loadSessionButton = document.querySelector('#load-session-button');
const loadSessionInput = document.querySelector('#load-session-input');
const plotList = document.querySelector('#plot-list');

datasetButton.addEventListener('click', () => {
  datasetInput.click();
});

datasetInput.addEventListener('change', async () => {
  const file = datasetInput.files[0];
  if (file !== undefined) {
    const data = await loadDataset(file);

    const session = {
      data,
      configuration: undefined,
    };

    await deleteDB();
    await createDB();
    await updateDB(session);

    plotList.style.display = 'block';
  } else {
    plotList.style.display = 'none';
  }
});

loadSessionButton.addEventListener('click', () => {
  loadSessionInput.click();
});

loadSessionInput.addEventListener('change', async () => {
  const file = loadSessionInput.files[0];
  if (file !== undefined) {
    const session = await loadSession(file);

    await deleteDB();
    await createDB();
    await updateDB(session);

    // TODO: Il codice del DB non è veramente sincrono, per il momento
    // gli viene dato un tempo fisso di attesa. Da correggere
    setTimeout(() => {
      window.location.href = `../..${session.configuration.pathToPage}`;
    }, 500);
  }
});
