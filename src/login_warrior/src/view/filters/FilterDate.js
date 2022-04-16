/**
 * @implements
 * Classe FilterId per la gestione del filtro sulla data.
 */
export default class FilterDate {
  #cssSelector;

  #date;

  constructor(cssSelector) {
    this.#cssSelector = cssSelector;
  }

  getFilter() {
    return this.#date;
  }

  setFilter(filter) {
    this.#date = filter;
  }
}
