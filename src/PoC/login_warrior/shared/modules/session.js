// Funzioni ausiliarie
const saveToFileJson = (jsonString) => {
  const file = new Blob([jsonString], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = 'session';
  a.click();
  URL.revokeObjectURL(a.href);
};

const readFile = async (file) => new Promise((resolve, reject) => {
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
 * Salva la sessione corrente su un file JSON.
 * La sessione contiene sia i dati che la configurazione del grafico visualizzato.
 * @param {Array} data - Array di oggetti contenenti i dati da visualizzare
 * @param {Object} configuration - Oggetto che contiene la configurazione del grafico visualizzato
 */
const saveSession = (data, configuration) => {
  const session = JSON.stringify(
    {
      data,
      configuration,
    },
  );
  saveToFileJson(session);
};

/**
 * Carica una sessione salvata su file JSON
 * @param {File} file - File in input, preso da un campo HTML <input type="file" />
 * @returns Oggetto javascript contenente la sessione salvata
 */
const loadSession = async (file) => {
  const session = await readFile(file);
  return JSON.parse(session);
};

export { saveSession, loadSession };
