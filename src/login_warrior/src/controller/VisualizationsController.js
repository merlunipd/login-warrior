/* eslint-disable-next-line no-unused-vars */
import Controller from './Controller.js';
import IndexedDBStorage from '../services/IndexedDB.js';
import VisualizationView from '../view/VisualizationView.js';
import Dataset from '../model/Dataset.js';
import Filters from '../model/Filters.js';

/**
 * Classe controller per le pagine con le visualizzazioni
 * @implements {Controller}
 */
export default class VisualizationsController {
  view;

  model;

  db;

  visualizationIndex;

  samplesLimit;

  constructor() {
    this.setup();
  }

  async setup() {
    this.setupStorage();
    await this.setupModel();
    this.setupView();
  }

  setupStorage() {
    this.db = new IndexedDBStorage();
  }

  async setupModel() {
    await this.loadModel();
    this.checkModelExists();
  }

  setupView() {
    this.createViews();
    this.setupViewsInitialState();
    this.setupEventListeners();
  }

  /* Metodi privati di supporto */

  async loadModel() {
    const loadedModel = await this.db.loadDataset();
    this.model = loadedModel ? Dataset.newDatasetFromObject(loadedModel) : null;
  }

  checkModelExists() {
    if (this.model === null) {
      window.location.href = '../home';
    }
  }

  createViews() {
    this.viewsInfo();
    this.view = new VisualizationView(this.visualizationIndex);
  }

  viewsInfo() {
    switch (this.getVisualizationName()) {
      case 'scatterplot_01':
        this.samplesLimit = 1000;
        this.visualizationIndex = 1;
        break;
      case 'scatterplot_02':
        this.samplesLimit = 1500;
        this.visualizationIndex = 2;
        break;
      case 'parallelcoordinates_01':
        this.samplesLimit = 1200;
        this.visualizationIndex = 3;
        break;
      case 'sankey_01':
        this.samplesLimit = 200;
        this.visualizationIndex = 4;
        break;

      default:
        window.location.href = '../home';
        break;
    }
  }

  /* eslint-disable-next-line class-methods-use-this */
  getVisualizationName() {
    return window.location.href.split('/').at(-2);
  }

  setupViewsInitialState() {
    // Visualizzazione
    this.view.visualization.draw(this.model.getDataset(this.samplesLimit));

    // Filtri
    this.setupFiltersInitialState();
  }

  setupFiltersInitialState() {
    const filters = this.model.getFilters();

    this.view.filterId.getDomObject().value = filters.getId();
    this.view.filterIp.getDomObject().value = filters.getIp();
    this.view.filterApplication.getDomObject().value = filters.getApplication();

    /* eslint-disable prefer-destructuring */
    if (filters.getDate()) {
      this.view.filterDate.getDomObject().value = filters.getDate().toISOString().split('T')[0];
    } else {
      this.view.filterDate.getDomObject().value = '';
    }
    /* eslint-enable prefer-destructuring */

    switch (filters.getEvent()) {
      case 'login':
        document.querySelector('#login-radio').checked = true;
        break;
      case 'error':
        document.querySelector('#error-radio').checked = true;
        break;
      case 'logout':
        document.querySelector('#logout-radio').checked = true;
        break;
      default:
        document.querySelector('#all-events-radio').checked = true;
        break;
    }
  }

  setupEventListeners() {
    this.eventListenerHomeButton();
    this.eventListenerSampleDatasetButton();
    this.eventListenerSaveButton();
    this.eventListenerFilters();
  }

  eventListenerHomeButton() {
    this.view.homeButton.setClick(() => {
      window.location.href = '../home';
    });
  }

  eventListenerSampleDatasetButton() {
    this.view.sampleDatasetButton.setClick(() => {
      this.view.visualization.draw(this.model.getDataset(this.samplesLimit));
    });
  }

  eventListenerSaveButton() {
    this.view.saveButton.setClick(() => {
      this.saveToFileJson(
        JSON.stringify({
          data: this.model,
          path: this.getVisualizationName(),
        }),
      );
    });
  }

  /* eslint-disable-next-line class-methods-use-this */
  saveToFileJson(jsonString) {
    const file = new Blob([jsonString], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'session';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  eventListenerFilters() {
    this.view.filterButton.setClick(() => {
      const filters = this.model.getFilters();

      // Filtro ID utente
      const idValue = this.view.filterId.getDomObject().value;
      filters.setId(idValue !== '' ? idValue : null);

      // Filtro IP
      const ipValue = this.view.filterIp.getDomObject().value;
      filters.setIp(ipValue !== '' ? ipValue : null);

      // Filtro applicazione
      const appValue = this.view.filterApplication.getDomObject().value;
      filters.setApplication(appValue !== '' ? appValue : null);

      // Filtro evento
      const eventValue = document.querySelector('input[name="event"]:checked').value;
      filters.setEvent(eventValue !== 'all' ? eventValue : null);

      // Filtro data
      const dateValue = this.view.filterDate.getDomObject().value;
      filters.setDate(dateValue !== '' ? new Date(dateValue) : null);

      // Imposta i filtri e aggiorna la visualizzazione
      this.model.setFilters(filters);
      this.view.visualization.draw(this.model.getDataset(this.samplesLimit));
    });

    this.view.resetFilterButton.setClick(() => {
      // Reset views
      this.view.filterId.getDomObject().value = '';
      this.view.filterIp.getDomObject().value = '';
      this.view.filterApplication.getDomObject().value = '';
      this.view.filterDate.getDomObject().value = '';
      document.querySelector('#all-events-radio').checked = true;

      // Reset modello
      const filters = new Filters(null, null, null, null, null);
      this.model.setFilters(filters);

      // Aggiornamento visualizzazione
      this.view.visualization.draw(this.model.getDataset(this.samplesLimit));
    });
  }
}
