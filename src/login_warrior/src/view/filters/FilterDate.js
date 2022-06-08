/**
 * @implements
 * Classe FilterId per la gestione del filtro sulla data.
 */

export default class FilterDate {
  cssSelector;

  constructor(cssSelector) {
    this.cssSelector = cssSelector;
  }

  getDomObject() {
    return document.querySelector(this.cssSelector);
  }
}
