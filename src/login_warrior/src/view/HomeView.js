/* eslint-disable no-unused-vars */
import LoadDatasetButton from './LoadDatasetButton.js';
import LoadSessionButton from './LoadSessionButton.js';
import VisualizationList from './VisualizationsList.js';
import View from './View.js';
/* eslint-enable no-unused-vars */

/**
 * @implements {View}
 *
 * Classe per la vista della schermata home.
 */
export default class HomeView {
  /**
   * Bottone per caricare il dataset
   * @type {LoadDatasetButton}
   */
  datasetbt;

  /**
   * Bottone per caricare una sessione
   * @type {LoadSessionButton}
   */
  sessionbt;

  /**
   * Lista che mostra tutte le possibili visualizzazioni dei grafici
   * @type {VisualizationList}
   */
   list;  

  constructor() {
    this.datasetbt = new LoadDatasetButton("#datasetButton");
    this.sessionbt = new LoadSessionButton("#load-session-button");
    this.list = new VisualizationList("#plot-list");
  }
}
