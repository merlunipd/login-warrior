/**
 * @implements
 * Classe FilterId per la gestione del filtro sull'applicazione.
 */
export default class FilterApplication {
  #cssSelector;

  constructor(cssSelector) {
    this.#cssSelector = cssSelector;
  }

  getDomObject() {
    return document.querySelector(this.#cssSelector);
  }
}
