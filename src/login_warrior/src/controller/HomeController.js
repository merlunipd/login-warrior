import Controller from "./Controller.js";
import IndexedDBStorage from "../services/IndexedDB.js";
import HomeView from "../view/HomeView.js";
import Dataset from "../model/Dataset.js";
import CSV from "../model/CSV.js";
import Filters from "../model/Filters.js";

/**
 * Classe controller per la home page
 * @implements {Controller}
 */
export default class HomeController {
  /**
   * Vista della home
   * @type {ViewHome}
   */
  view;

  /**
   * Modello
   * @type {Dataset}
   */
  model;

  /**
   * Database
   * @type {IndexedDBStorage}
   */
  db;

  /**
   * Costruttore a zero parametri
   */
  constructor() {
    this.setup();
  }

  async setup() {
    this.setupStorage();
    await this.setupModel();
    this.setupView();
  }

  /**
   * Funzione per impostare il database
   */
  setupStorage() {
    this.db = new IndexedDBStorage();
  }

  /**
   * Funzione per impostare il modello
   */
  async setupModel() {
    await this.loadModel();
  }

  /**
   * Funzione per impostare la view
   */
  setupView() {
    this.createViews();
    this.setupViewsState();
    this.setupViewsEventListeners();
  }





  /* Metodi privati di supporto */

  async loadModel() {
    const loadedModel = await this.db.loadDataset();
    this.model = loadedModel ? Dataset.newDatasetFromObject(loadedModel) : null;
  }

  /**
   * Funzione per creare la view della home
   */
  createViews() {
    this.view = new HomeView();
  }

  /**
    * Funzione per settare lo stato della view
    */
  setupViewsState() {
    if (this.model) {
      this.view.list.show(true);
    } else {
      this.view.list.show(false);
    }
  }

  /**
    * Funzione per la gestione degli eventi
    */
  setupViewsEventListeners() {
    this.eventListenerDatasetButton();
    this.eventListenerSessionButton();
  }

  eventListenerDatasetButton() {
    this.loadDatasetFunction();
    this.view.datasetbt.setClick(this.loadDatasetTrigger);
  }

  loadDatasetFunction() {
    document.querySelector("#datasetInput").addEventListener('change', async () => {
      const file = datasetInput.files[0];
      if (file !== undefined) {
        // Leggi file
        const text = await this.readFile(file);

        // Crea modello
        const csv = new CSV(text);
        const filters = new Filters(null, null, null, null, null);
        this.model = new Dataset(csv, filters);

        // Salva il modello su IndexedDB
        await this.db.saveDataset(this.model);

        // Mostra la lista
        this.view.list.show(true);
      }
    });
  }

  async readFile(file) {
    return new Promise((resolve, reject) => {
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
  }

  loadDatasetTrigger() {
    document.querySelector("#datasetInput").click();
  }

  // TODO
  eventListenerSessionButton() { }
}