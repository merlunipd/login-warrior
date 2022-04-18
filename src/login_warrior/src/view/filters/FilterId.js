/**
 * @implements
 * Classe FilterId per la gestione del filtro sul id.
 */
export default class FilterId {
  #cssSelector;

  #id;

  constructor(cssSelector) {
    this.#cssSelector = cssSelector;
  }

  getFilter() {
    return this.#id;
  }

  setFilter(filter) {
    this.#id = filter;
  }
}
