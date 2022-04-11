import Model from "./Model.js";
import Filters from "./Filters.js";
import CSV from "./CSV.js";
import DataPoint from "./DataPoint.js";

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
  #dataset;

  /**
   * Filtri sui dati
   * @type {Filters}
   */
  #filters;

  /**
   * @param {CSV} csv CSV da cui estrarre il dataset 
   * @param {Filters} filters Filtri iniziali sui dati
   */
  constructor(csv, filters) {
    this.#dataset = csv.parseCsv();
    this.#filters = filters;
  }

  // TODO
  /**
   * Ritorna i punti del dataset, filtrati e poi (se necessario) campionati
   * @param {number} samplesLimit Numero massimo di punti del dataset da campionare
   * @returns {DataPoint[]} Punti del dataset
   */
  getDataset(samplesLimit) {
    return this.#sampleDataset(this.#filterDataset(), samplesLimit);
  }

  // TODO
  getDatasetUnfiltered() { }

  // TODO
  getDatasetUnsampled() { }

  /**
   * Ritorna tutti i punti del dataset, senza filtri e senza campionamento
   * @returns {DataPoint[]} Punti del dataset
   */
  getDatasetUnfilteredUnsampled() {
    return [...this.#dataset];
  }

  /**
   * @returns {Filters} Filtri attuali del dataset
   */
  getFilters() {
    return this.#filters;
  }

  /**
   * @param {Filters} filters Filtri aggiornati per il dataset
   */
  setFilters(filters) {
    this.#filters = filters;
  }

  // TODO
  #filterDataset() {

  }

  /**
   * Funzione di campionamento del dataset (casuale per il momento)
   * @param {DataPoint[]} dataset Dataset da campionare
   * @param {number} samplesLimit Numero massimo di punti che ritorna la funzione di campionamento
   * @returns {DataPoint[]} Dataset campionato 
   */
  #sampleDataset(dataset, samplesLimit) {
    const datasetCopy = [...dataset];
    const shuffledDataset = datasetCopy.sort(() => 0.5 - Math.random());
    const sampledDataset = shuffledDataset.slice(0, samplesLimit);
    return sampledDataset;
  }
}
