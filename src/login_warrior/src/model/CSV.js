import DataPoint from './DataPoint.js';

/**
 * Classe per gestire ed effettuare parsing di file CSV
 */
export default class CSV {
  /**
   * Contenuto testuale del file CSV
   * @type {string}
   */
  csvText;

  /**
   * @param {string} csv Testo del file CSV caricato
   */
  constructor(csv) {
    this.csvText = csv;
  }

  /**
   * Ritorna il dataset relativo al file CSV
   * @returns {DataPoint[]} Array di DataPoint che compongono il dataset
   */
  parseCsv() {
    if (this.csvText === undefined) {
      return [];
    }

    const dataset = [];
    const lines = this.csvText.split('\n').filter((line) => line !== '');
    lines.forEach((line) => {
      const dp = line.split(';');
      const id = dp[0].trim();
      const ip = dp[6].trim();
      const date = new Date(dp[2].trim());
      let event;
      switch (dp[3].trim()) {
        case '1':
          event = 'login';
          break;
        case '2':
          event = 'error';
          break;
        case '3':
          event = 'logout';
          break;
        default:
          throw new Error('Evento non riconosciuto');
      }
      const application = dp[4].trim();
      dataset.push(new DataPoint(id, ip, date, event, application));
    });
    return dataset;
  }

  /**
   * @returns {string} Testo del CSV caricato
   */
  getCsvText() {
    return this.csvText;
  }
}
