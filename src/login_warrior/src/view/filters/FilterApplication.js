/**
 * @implements
 * Classe FilterId per la gestione del filtro sull'applicazione.
 */
export default class FilterApplication {
  #cssSelector;

  #appilcation;

  constructor(cssSelector) {
    this.#cssSelector = cssSelector;
  }

  getFilter() {
    return this.#appilcation;
  }

  setFilter(filter) {
    this.#appilcation = filter;
  }
}
