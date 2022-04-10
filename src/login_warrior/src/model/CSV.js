import DataPoint from './DataPoint.js';

/**
 * Classe per gestire ed effettuare parsing di file CSV
 */
export default class CSV {
  #csvText;

  /**
   * @param {string} csv Testo del file CSV caricato
   */
  constructor(csv) {
    this.#csvText = csv;
  }

  /**
   * @returns {DataPoint[]} Array di DataPoint che compongono il dataset
   */
  parseCsv() {
    const dataset = [];
    const lines = this.#csvText.split('\n').filter((line) => line !== '');
    lines.forEach((line) => {
      const dp = line.split(';');
      const id = dp[0];
      const ip = dp[6];
      const date = new Date(dp[2]);
      let event;
      switch (dp[3]) {
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
      const application = dp[4];
      dataset.push(new DataPoint(id, ip, date, event, application));
    });
    return dataset;
  }

  /**
   * @returns {string} Testo del CSV caricato
   */
  getCsvText() {
    return this.#csvText;
  }
}
