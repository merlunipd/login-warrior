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
  #samplesLimit = 100; // TODO: cambiare in base al grafico selezionato (eg check this.#db.loadVisualizationIndex() )

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
      window.location.href = '../home';
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
    this.#view.visualization.draw(this.#model.getDataset(this.#samplesLimit));

    // Filtri
    this.#view.filterId.setFilter(this.#model.getFilters().getId());
    this.#view.filterIp.setFilter(this.#model.getFilters().getIp());
    this.#view.filterApplication.setFilter(this.#model.getFilters().getApplication());
    this.#view.filterEvent.setFilter(this.#model.getFilters().getEvent());
    // Attenzione: la data viene convertita in stringa
    this.#view.filterDate.setFilter(this.#model.getFilters().getDate().toString());
  }

  #setupEventListeners() {
    this.#eventListenerHomeButton();
    this.#eventListenerSaveButton();
    this.#eventListenerSampleDatasetButton();
    this.#eventListenerFilters();
    this.#eventListenerCustomizations();
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
    // TODO: bisogna testare il funzionamento di questo
    this.#view.visualization.draw(this.#model.getDataset(this.#samplesLimit)); 
  }

  #eventListenerFilters() {
    // TODO
  }

  #eventListenerCustomizations() {
    // TODO: implementare quando ci saranno le personalizzazioni
  }
}
