import Controller from "./Controller.js";
import IndexedDBStorage from "../services/IndexedDBStorage.js";

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
    
  }

  #setupEventListeners() { }
}