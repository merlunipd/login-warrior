import loadCsv from './modules/loadCsv.js';

const setupDOM = () => {
  const csvInput = document.querySelector('#csvInput');
  const datasetButton = document.querySelector('#datasetButton');

  datasetButton.addEventListener('click', async () => {
    csvInput.click();
  });

  csvInput.addEventListener('change', async () => {
    const file = csvInput.files[0];
    if (file !== undefined) {
      // eslint-disable-next-line no-unused-vars
      const data = await loadCsv(file);
    }
  });
};

setupDOM();
