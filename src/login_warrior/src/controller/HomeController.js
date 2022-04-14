import Controller from "./Controller.js";

/**
 * Classe controller per la home page
 * @implements {Controller}
 */
export default class HomeController extends Controller {
  #view;
  #model;
  #db;

  constructor() {
    super();
  }

  setupStorage() {
    this.#createStorage();
  }

  setupModel() {
    this.#checkDatasetExists();
  }

  setupView() {
    this.#createViews();
    this.#setupViewsState();
    this.#setupViewsEventListeners();
  }

  #createStorage() {
    this.#db = new IndexedDBStorage();
  }
}