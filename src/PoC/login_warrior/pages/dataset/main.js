import loadCsv from './modules/loadCsv.js';

const setupDOM = () => {
  const csvInput = document.querySelector('#csvInput');
  const csvInputButton = document.querySelector('#csvInputButton');
  const datasetButton = document.querySelector('#datasetButton');

  csvInput.addEventListener('change', () => {
    datasetButton.disabled = csvInput.files[0] === undefined;
  });

  csvInputButton.addEventListener('click', () => {
    csvInput.click();
  });

  datasetButton.addEventListener('click', () => {
    const file = csvInput.files[0];
    // eslint-disable-next-line no-unused-vars
    const data = loadCsv(file);
  });
};

setupDOM();
