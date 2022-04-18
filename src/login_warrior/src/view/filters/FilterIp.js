/**
 * @implements
 * Classe FilterId per la gestione del filtro sul ip.
 */
export default class FilterIp {
  #cssSelector;

  #ip;

  constructor(cssSelector) {
    this.#cssSelector = cssSelector;
  }

  getFilter() {
    return this.#ip;
  }

  setFilter(filter) {
    this.#ip = filter;
  }
}
