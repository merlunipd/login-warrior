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

  constructor() {
    super();
  }

  setupStorage() {
    this.#db = new IndexedDBStorage();
    this.#checkDataExists()
  }

  setupModel() {
    this.#createModel();
  }

  setupView() {
    this.#createViews();
    this.#setupViewsInitialState();
    this.#setupEventListeners();
  }



  /* Metodi privati di supporto */

  #checkDataExists() {
    if (this.#db.loadDataset() === null ||
      this.#db.loadCustomizations() === null ||
      this.#db.loadVisualizationIndex() === null) {
      alert("Dati non caricati"); // TODO: rimandare alla pagina home (invece di alert)
    }
  }

  #createModel() {
    this.#model = this.#db.loadDataset();
  }

  #createViews() {
    const visualizationIndex = this.#db.loadVisualizationIndex();
    this.#view = new VisualizationView(visualizationIndex);
  }

  #setupViewsInitialState() { 
    // Visualizzazione
    this.#view.visualization.draw();

    // Filtri
    this.#view.filterId.setFilter(this.#model.getFilters().getId());
    this.#view.filterIp.setFilter(this.#model.getFilters().getIp());
    this.#view.filterApplication.setFilter(this.#model.getFilters().getApplication());
    this.#view.filterEvent.setFilter(this.#model.getFilters().getEvent());
    // Attenzione: la data viene convertita in stringa
    this.#view.filterDate.setFilter(this.#model.getFilters().getDate().toString());
  }

  #setupEventListeners() { 
    // TODO
  }
}