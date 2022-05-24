/**
 * @implements
 * Classe FilterId per la gestione del filtro sull'evento.
 */
 import JsDom from '../JsDomImport.js';
export default class FilterEvent {
  cssSelector;

  constructor(cssSelector) {
    this.cssSelector = cssSelector;
  }

  getDomObject() {
    return document.querySelector(this.cssSelector);
  }
}
