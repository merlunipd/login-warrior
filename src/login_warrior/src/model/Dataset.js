/* eslint-disable no-unused-vars */
import Model from './Model.js';
import Filters from './Filters.js';
import CSV from './CSV.js';
import DataPoint from './DataPoint.js';
/* eslint-enable no-unused-vars */

/**
 * @implements {Model}
 *
 * Classe per interagire con il dataset.
 * Principale classe del modello.
 */
export default class Dataset {
  /**
   * Dataset completo
   * @type {DataPoint[]}
   */
  dataset;

  /**
   * Filtri sui dati
   * @type {Filters}
   */
  filters;

  /**
   * Filtri sui dati
   * @type {CSV}
   */
  csv;

  /**
   * @param {CSV} csv CSV da cui estrarre il dataset
   * @param {Filters} filters Filtri iniziali sui dati
   */
  constructor(csv, filters) {
    try {
      this.dataset = csv.parseCsv();
    } catch (error) {
      throw new Error('error parsing csv');
    }

    this.filters = filters;
    this.csv = csv;
  }

  /**
   * Ritorna i punti del dataset, filtrati e poi (se necessario) campionati
   * @param {number} samplesLimit Numero massimo di punti del dataset da campionare
   * @returns {DataPoint[]} Punti del dataset
   */
  getDataset(samplesLimit) {
    return this.sampleDataset(this.filterDataset(), samplesLimit);
  }

  /**
   * Ritorna i punti del dataset, (se necessario) campionati ma non filtrati
   * @param {number} samplesLimit Numero massimo di punti del dataset da campionare
   * @returns {DataPoint[]} Punti del dataset
   */
  getDatasetUnfiltered(samplesLimit) {
    return this.sampleDataset(this.dataset, samplesLimit);
  }

  /**
   * Ritorna i punti del dataset, filtrati ma non campionati
   * @returns {DataPoint[]} Punti del dataset
   */
  getDatasetUnsampled() {
    return this.filterDataset();
  }

  /**
   * Ritorna tutti i punti del dataset, senza filtri e senza campionamento
   * @returns {DataPoint[]} Punti del dataset
   */
  getDatasetUnfilteredUnsampled() {
    return [...this.dataset];
  }

  /**
   * @returns {Filters} Filtri attuali del dataset
   */
  getFilters() {
    return this.filters;
  }

  /**
   * @param {Filters} filters Filtri aggiornati per il dataset
   */
  setFilters(filters) {
    this.filters = filters;
  }

  /**
   * Funzione per filtrare il dataset corrente utilizzando i filtri correnti.
   *
   * Attenzione: il filtro della data viene eseguito considerando
   * l'uguaglianza di giorno, mese, anno.
   * @returns {DataPoint[]} Dataset filtrato
   */
  filterDataset() {
    return this.dataset.filter((dataPoint) => {
      const idFilter = this.filters.getId();
      if (idFilter === null) {
        return true;
      }
      return dataPoint.getId() === idFilter;
    })
      .filter((dataPoint) => {
        const ipFilter = this.filters.getIp();
        if (ipFilter === null) {
          return true;
        }
        return dataPoint.getIp() === ipFilter;
      })
      .filter((dataPoint) => {
        const dateFilter = this.filters.getDate();
        if (dateFilter === null) {
          return true;
        }
        return dataPoint.getDate().getFullYear() === (new Date(dateFilter)).getFullYear()
          && dataPoint.getDate().getMonth() === (new Date(dateFilter)).getMonth()
          && dataPoint.getDate().getDate() === (new Date(dateFilter)).getDate();
      })
      .filter((dataPoint) => {
        const eventFilter = this.filters.getEvent();
        if (eventFilter === null) {
          return true;
        }
        return dataPoint.getEvent() === eventFilter;
      })
      .filter((dataPoint) => {
        const applicationFilter = this.filters.getApplication();
        if (applicationFilter === null) {
          return true;
        }
        return dataPoint.getApplication() === applicationFilter;
      });
  }

  /**
   * Funzione di campionamento del dataset.
   *
   * Se il numero di punti del dataset è minore o uguale di samplesLimit,
   * ritorna una copia del dataset stesso, altrimenti effettua un campionamento casuale dei dati.
   * @param {DataPoint[]} dataset Dataset da campionare
   * @param {number} samplesLimit Numero massimo di punti che ritorna la funzione di campionamento
   * @returns {DataPoint[]} Dataset campionato
   */
  /* eslint-disable class-methods-use-this */
  sampleDataset(dataset, samplesLimit) {
    if (dataset.length <= samplesLimit) {
      return [...dataset];
    }
    const datasetCopy = [...dataset];
    const shuffledDataset = datasetCopy.sort(() => 0.5 - Math.random());
    let sampledDataset = [];

    // if per differenziare il campionamento per lo Scatter Plot 2. (da pensare)
    if (samplesLimit >= 1200) {
      const utenti = [];
      let i = 0;
      for (let index = 0; index < shuffledDataset.length && i < 50; index += 1) {
        if (utenti.includes(shuffledDataset[index].getId()) === false) {
          utenti[i] = shuffledDataset[index].getId();
          i += 1;
        }
      }
      i = 0;
      for (let index = 0; index < shuffledDataset.length && i < samplesLimit; index += 1) {
        if (utenti.includes(shuffledDataset[index].getId())) {
          sampledDataset[i] = shuffledDataset[index];
          i += 1;
        }
      }
    } else {
      sampledDataset = shuffledDataset.slice(0, samplesLimit);
    }
    return sampledDataset;
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Necessario poichè una volta salvato l'oggetto in IndexedDB, il tipo viene perso.
   * Funziona solo se tutti i campi dati sono pubblici.
   */
  static newDatasetFromObject(o) {
    const csv = new CSV(o.csv.csvText);
    const filters = new Filters(
      o.filters.id,
      o.filters.ip,
      o.filters.date === null ? null : new Date(o.filters.date),
      o.filters.event,
      o.filters.application,
    );
    return new Dataset(csv, filters);
  }
}
