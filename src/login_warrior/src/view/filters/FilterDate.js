/**
 * @implements
 * Classe FilterId per la gestione del filtro sulla data.
 */
 import JsDom from '../JsDomImport.js';
export default class FilterDate {
  cssSelector;

  constructor(cssSelector) {
    this.cssSelector = cssSelector;
  }

  getDomObject() {
    return document.querySelector(this.cssSelector);
  }
}
