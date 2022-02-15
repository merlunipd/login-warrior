import parseCsv from './parseCsv.js';

// Funzioni ausiliarie
const readCsvFile = async (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = () => {
    reader.abort();
    reject(new DOMException('Error reading input file'));
  };
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.readAsText(file);
});

/**
 * Legge un file CSV e ritorna un array di oggetti, ciascuno dei quali
 * rappresentatne una riga del CSV.
 * Ogni oggetto contiene i campi: "utente", "data", "tipoEvento", "applicazione", "ip".
 * Il campo "ip" può essere vuoto
 * @param {File} file - File CSV da caricare
 * @returns Array di oggetti
 */
const loadCsvFile = async (file) => {
  const text = await readCsvFile(file);
  const data = parseCsv(text);
  return data;
};

export default loadCsvFile;
