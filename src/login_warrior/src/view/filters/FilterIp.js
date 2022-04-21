/**
 * @implements
 * Classe FilterId per la gestione del filtro sul ip.
 */
export default class FilterIp {
  #cssSelector;

  constructor(cssSelector) {
    this.#cssSelector = cssSelector;
  }

  getDomObject() {
    return document.querySelector(this.#cssSelector);
  }
}
