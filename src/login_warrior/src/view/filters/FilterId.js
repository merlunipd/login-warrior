/**
 * @implements
 * Classe FilterId per la gestione del filtro sul id.
 */
 import JsDom from '../JsDomImport.js';
export default class FilterId {
  cssSelector;

  constructor(cssSelector) {
    this.cssSelector = cssSelector;
  }

  getDomObject() {
    return document.querySelector(this.cssSelector);
  }
}
