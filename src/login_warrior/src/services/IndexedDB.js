// import { Storage } from "./Storage";
/* eslint-disable-next-line no-unused-vars, import/no-unresolved */
import * as DexieLibrary from 'https://unpkg.com/dexie/dist/dexie.js';
 //import Dexie from 'dexie';

/*
    ISTRUZIONI:
        Per testing:
            -eseguire 'npm install dexie' da terminale
            -togliere commento '//import Dexie from "dexie";'

        Per esecuzione:
            -togliere come commento '//import * as DexieLibrary from "https://unpkg.com/dexie/dist/dexie.js";'
*/

/**
 * @class IndexedDB
 * @extends Storage
 */
export default class IndexedDB /** extends Storage */ {
  db = null;

  /**
     * @constructor
     * @param {string} name
     */
  constructor(name = 'IndexedDataBase') {
    /* eslint-disable-next-line no-undef */
    this.db = new Dexie(name);
    this.db.version(1).stores({
      Dataset: '++id, data',
      Customization: '++id, data',
      Visualization: '++id, data',
    });
  }

  /**
     * @param {Dataset} d
     * @returns {void} nothing
     */
  async saveDataset(d) {
    await this.db.Dataset.put(
      { id: 1, data: d },
    );
  }

  /**
     * @param {void} nothing
     * @returns {Object} obj{id,data}
     */
  async loadDataset() {
    const res = await this.db.Dataset.where('id').equals(1).first();
    return res ? res.data : res;
  }

  /**
     * @param {Customization} c
     * @returns {void} nothing
     */
  async saveCustomization(c) {
    this.db.Customization.put(
      { id: 1, data: c },
    );
  }

  /**
     * @param {void} nothing
     * @returns {Object} obj{id,data}
     */
  async loadCustomization() {
    /* eslint-disable-next-line no-return-await */
    return await this.db.Customization.where('id').equals(1).first();
  }

  /**
     * @param {number} index
     * @returns {void} nothing
     */
  async saveVisualizationIndex(index) {
    await this.db.Visualization.put(
      { id: 1, data: index },
    );
  }

  /**
     * @param {void} nothing
     * @returns {Object} obj{id,data}
     */
  async loadVisualizationIndex() {
    /* eslint-disable-next-line no-return-await */
    return await this.db.Visualization.where('id').equals(1).first();
  }

  /**
     * Ritorna il numero di tuple presenti nella tabella Dataset
     * @param {void} nothing
     * @returns {int} int
     */
  async counterDataset() {
    /* eslint-disable-next-line no-return-await */
    return await this.db.Dataset.count();
  }

  /**
     * Ritorna il numero di tuple presenti nella tabella Customization
     * @param {void} nothing
     * @returns {int} int
     */
  async counterCustomization() {
    /* eslint-disable-next-line no-return-await */
    return await this.db.Customization.count();
  }

  /**
     * Ritorna il numero di tuple presenti nella tabella Visualization
     * @param {void} nothing
     * @returns {int} int
     */
  async counterVisualization() {
    /* eslint-disable-next-line no-return-await */
    return await this.db.Visualization.count();
  }
}
