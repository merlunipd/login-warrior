import Controller from "./Controller.js";

/**
 * Classe controller per la home page
 * @implements {Controller}
 */
export default class HomeController extends Controller {
  /**
   * Vista della home
   * @type {ViewHome}
   */
  #view;

  /**
   * Modello
   * @type {Dataset}
   */
  #model;

  /**
   * Database
   * @type {IndexedDBStorage}
   */
  #db;

  /**
   * Costruttore a zero parametri
   */
  constructor() {
    super();
  }

  /**
   * Funzione per impostare il database
   */
  setupStorage() {
    this.#createStorage();
  }

  /**
   * Funzione per impostare il modello
   */
  setupModel() {
    this.#checkDatasetExists();
  }

  /**
   * Funzione per impostare la view
   */
  setupView() {
    this.#createViews();
    this.#setupViewsState();
    this.#setupViewsEventListeners();
  }

  /**
   * Funzione per creare il database
   */
  #createStorage() {
    this.#db = new IndexedDBStorage();
  }

  /**
   * Funzione per controllare se è presente un dataset
   */
  #checkDatasetExists() {
    /**
     * Uso le funzioni get perché logicamente a mio parere le load è vero
     * che ritornano un dataset ma implementano anche il caricamento del
     * dataset e questa funzione controlla solo che sia presente o meno.
     * A questo punto andrebbe implementata anche la get del dataset nel db
     */
    const dataset = this.#db.getDataset();
    const filters = this.#db.getDataset().getFilters();
    //const dataset = this.#db.loadDataset();
    //const filters = this.#db.loadDataset().getFilters();
    if (dataset) {
      if (filters) {
        this.#model = new Dataset(dataset.getDatasetUnsampled(), filters);
      } else {
        this.#model = new Dataset(dataset.getDatasetUnfilteredUnsampled(), filters);
      }
    }
  }

  /**
   * Funzione per aggiornare il model
   */
  #updateModel() {
    const dataset = this.#db.loadDataset();
    const filters = this.#db.loadDataset().getFilters();
    if (dataset) {
      if (filters) {
        this.#model = new Dataset(dataset.getDatasetUnsampled(), filters);
      } else {
        this.#model = new Dataset(dataset.getDatasetUnfilteredUnsampled(), filters);
      }
    }
  }

  /**
   * Funzione per creare la view della home
   */
  #createViews() {
    this.#view = new HomeView();
  }

  /**
   * Funzione per settare lo stato della view
   */
  #setupViewsState() {
    //if (this.#model.getDatasetUnfilteredUnsampled()) {
    if (this.#db.getDataset()) {
      this.#view.visualizationList.show(true);
    }
  }

  /**
   * Funzione per la gestione degli eventi
   */
  #setupViewsEventListeners() {
    const datasetButton = this.#view.loadDatasetButton;
    const sessionButton = this.#view.loadSessionButton;
    const list = this.#view.visualizationList;

    datasetButton.addEventListener("click", () => {
      this.#updateModel();
      this.#setupViewsState();
    });

    sessionButton.addEventListener("click", () => {
      this.#db.loadSession();

      /**
       * Suppongo ci saranno i metodi per salvare e caricare la sessione nel db.
       * Nel momento in cui carico la sessione dovrebbe essere mostrata la view
       * della visualizzazione corrispondente, a questo punto però entra in gioco
       * il VisualizationController, mi sfugge quindi come effettuare questo passaggio
       */
    });

    list.forEach(element => {
      /** 
       * per ogni elemento della lista collego l'evento al click sul bottone(?),
       * suppongo ogni elemento abbia la parte di descrizione e il bottone,
       * o come campo dati o lo prendo direttamente dal DOM (non so se in
       * questo modo sia corretto)
      */
      //element.visualizationButton.addEventListener("click", () => {
      element.getElementsByTagName(button).addEventListener("click", () => {
        /**
         * Stesso discorso fatto sopra per quanto riguarda l'entrata in gioco
         * del VisualizationController
         */
      })
    });
  }
}