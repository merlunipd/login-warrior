import Controller from "./Controller.js";
import IndexedDBStorage from "../services/IndexedDB.js";
import VisualizationView from "../view/VisualizationView.js";
import Dataset from "../model/Dataset.js";

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
    console.log(this.model);
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
      case "scatterplot_01":
        this.samplesLimit = 1000;
        this.visualizationIndex = 1;
        break;

      default:
        window.location.href = '../home';
        break;
    }
  }

  getVisualizationName() {
    return window.location.href.split("/").at(-2)
  }

  setupViewsInitialState() {
    // Visualizzazione
    this.view.visualization.draw(this.model.getDataset(this.samplesLimit));

    // TODO: implementare i filtri
    // Filtri
  }

  setupEventListeners() {
    this.eventListenerHomeButton();
    this.eventListenerSampleDatasetButton();
    this.eventListenerSaveButton();
    // TODO completare
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

  // TODO
  eventListenerSaveButton() {
    this.view.saveButton.setClick(() => {
      this.saveToFileJson(
        JSON.stringify({
          data: this.model,
          path: this.getVisualizationName()
        })
      );
    });
  }

  saveToFileJson(jsonString) {
    const file = new Blob([jsonString], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'session';
    a.click();
    URL.revokeObjectURL(a.href);
  }


  // TODO: implementare i filtri
  eventListenerFilters() { }
}