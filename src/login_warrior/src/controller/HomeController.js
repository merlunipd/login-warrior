/* eslint-disable-next-line no-unused-vars */
import Controller from './Controller.js';
import IndexedDBStorage from '../services/IndexedDB.js';
import HomeView from '../view/HomeView.js';
import Dataset from '../model/Dataset.js';
import CSV from '../model/CSV.js';
import Filters from '../model/Filters.js';

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
  /* constructor() {
    this.setup();
  } */

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

    // Reset filtri se qualche dataset è caricato
    if (this.model) {
      const emptyFilters = new Filters(null, null, null, null, null);
      this.model.setFilters(emptyFilters);
      await this.db.saveDataset(this.model);
    }
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
    document.querySelector('#datasetInput').addEventListener('change', async () => {
      document.getElementById('error-message').style.display = 'none';
      document.getElementById('loading_screen').style.display = 'block';
      this.view.list.show(false);
      const file = document.querySelector('#datasetInput').files[0];
      if (file !== undefined) {
        // Leggi file
        const text = await this.readFile(file);

        // Pulisci input
        document.querySelector('#datasetInput').value = null;

        // Crea modello
        const csv = new CSV(text);
        const filters = new Filters(null, null, null, null, null);
        try {
          this.model = new Dataset(csv, filters);

          // Salva il modello su IndexedDB
          await this.db.saveDataset(this.model);

          // Mostra la lista
          this.view.list.show(true);
        } catch (error) {
          document.getElementById('error-message').style.display = 'block';
        }
        document.getElementById('loading_screen').style.display = 'none';
      }
    });
  }

  /* eslint-disable-next-line class-methods-use-this */
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

  /* eslint-disable-next-line class-methods-use-this */
  loadDatasetTrigger() {
    document.querySelector('#datasetInput').click();
  }

  eventListenerSessionButton() {
    this.loadSessionFunction();
    this.view.sessionbt.setClick(this.loadSessionTrigger);
  }

  loadSessionFunction() {
    document.querySelector('#load-session-input').addEventListener('change', async () => {
      document.getElementById('error-message').style.display = 'none';
      document.getElementById('loading_screen').style.display = 'block';
      this.view.list.show(false);
      const file = document.querySelector('#load-session-input').files[0];
      if (file !== undefined) {
        // Leggi file
        const text = await this.readFile(file);

        // Pulisci input
        document.querySelector('#load-session-input').value = null;

        try {
          // Carica modello
          this.model = Dataset.newDatasetFromObject(JSON.parse(text).data);
          await this.db.saveDataset(this.model);

          // Reindirizza alla pagina corretta
          window.location.href = `../${JSON.parse(text).path}`;
        } catch (error) {
          document.getElementById('error-message').style.display = 'block';
        }
        document.getElementById('loading_screen').style.display = 'none';
      }
    });
  }

  /* eslint-disable-next-line class-methods-use-this */
  loadSessionTrigger() {
    document.querySelector('#load-session-input').click();
  }
}
