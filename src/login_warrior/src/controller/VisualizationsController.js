import Controller from "./Controller.js";
import IndexedDBStorage from "../services/IndexedDBStorage.js";
import VisualizationView from "../view/VisualizationView.js";

/**
 * Classe controller per le pagine con le visualizzazioni
 * @implements {Controller}
 */
export default class VisualizationsController extends Controller {
  #view;
  #model;
  #db;
  #visualizationIndex;
  #samplesLimit;

  constructor() {
    super();
  }

  setupStorage() {
    this.#db = new IndexedDBStorage();
  }

  setupModel() {
    this.#loadModel();
    this.#checkModelExists();
  }

  setupView() {
    this.#createViews();
    // TODO: BOOKMARK (continuare da qui)
    this.#setupViewsInitialState();
    this.#setupEventListeners();
  }



  

  /* Metodi privati di supporto */

  #loadModel() {
    this.#model = this.#db.loadDataset();
  }

  #checkModelExists() {
    if (this.#model === undefined) {
      window.location.href = '../home';
    }
  }

  #createViews() {
    this.#viewsInfo();
    this.#view = new VisualizationView(this.#visualizationIndex);
  }

  #viewsInfo() {
    // TODO: spostare in view?
    const visualizationsName = window.location.href.split("/").at(-2);
    switch (visualizationsName) {
      case "scatterplot_01":
        this.#samplesLimit = 1000;
        this.#visualizationIndex = 1;
        break;

      default:
        window.location.href = '../home';
        break;
    }
  }

  #setupViewsInitialState() {
    // Visualizzazione
    this.#view.visualization.draw(this.#model.getDataset(this.#samplesLimit));

    // TODO: implementare i filtri
    // Filtri
  }

  #setupEventListeners() {
    this.#eventListenerHomeButton();
    this.#eventListenerSaveButton();
    this.#eventListenerSampleDatasetButton();
    this.#eventListenerFilters();
  }

  #eventListenerHomeButton() {
    window.location.href = '../home';
  }

  #eventListenerSaveButton() {
    this.#saveToFileJson(
      JSON.stringify(this.#model)
    );
  }

  #saveToFileJson(jsonString) {
    const file = new Blob([jsonString], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'session';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  #eventListenerSampleDatasetButton() {
    this.#view.visualization.draw(this.#model.getDataset(this.#samplesLimit));
  }

  // TODO: implementare i filtri
  #eventListenerFilters() { }
}