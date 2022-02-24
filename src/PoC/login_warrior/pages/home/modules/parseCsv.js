/**
 * Legge una stringa CSV e ritorna un array di oggetti, ciascuno dei quali
 * rappresentatne una riga del CSV.
 * Ogni oggetto contiene i campi: "id", "utente", "data", "tipoEvento", "applicazione", "ip".
 * @param {string} text - Stringa CSV
 * @returns Array di oggetti
 */
const parseCsv = (text) => text.split('\n')
  .filter((line) => line !== '')
  .map((line, index) => {
    const entryArray = line.split(';');
    const entryObject = {};
    [
      entryObject.id,
      entryObject.utente,
      entryObject.data,
      entryObject.tipoEvento,
      entryObject.applicazione,
      entryObject.ip,
    ] = [
      index,
      entryArray[0].trim(),
      entryArray[2].trim(),
      entryArray[3].trim(),
      entryArray[4].trim(),
      entryArray[6].trim(),
    ];
    return entryObject;
  });

export default parseCsv;
