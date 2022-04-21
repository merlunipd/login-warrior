/**
 * @implements
 * Classe FilterId per la gestione del filtro sul id.
 */
export default class FilterId {
  #cssSelector;

  constructor(cssSelector) {
    this.#cssSelector = cssSelector;
  }

  getDomObject() {
    return document.querySelector(this.#cssSelector);
  }
}
