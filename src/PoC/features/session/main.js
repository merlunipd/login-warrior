import { saveSession, loadSession } from './modules/session.js';

// DEBUG: dati di test
const testData = [
  {
    firstName: 'Mario',
    lastName: 'Rossi',
    age: 38,
    eyeColor: 'Blu',
  },
  {
    firstName: 'Giulia',
    lastName: 'Bianchi',
    age: 39,
    eyeColor: 'Verde',
  },
];
const testConfiguration = {
  dataInizio: '14/08/1999',
  dataFine: '15/02/2022',
  filtroUtente: 'Mario',
  filtroIp: '255.255.255.255',
};

const setupDOM = () => {
  const saveSessionButton = document.querySelector('#saveSessionButton');
  const loadSessionButton = document.querySelector('#loadSessionButton');
  const loadSessionInput = document.querySelector('#loadSessionInput');

  saveSessionButton.addEventListener('click', () => {
    saveSession(testData, testConfiguration);
  });

  loadSessionButton.addEventListener('click', () => {
    loadSessionInput.click();
  });

  loadSessionInput.addEventListener('change', async () => {
    const file = loadSessionInput.files[0];
    if (file !== undefined) {
      // eslint-disable-next-line no-unused-vars
      const session = await loadSession(file);
    }
  });
};

setupDOM();
