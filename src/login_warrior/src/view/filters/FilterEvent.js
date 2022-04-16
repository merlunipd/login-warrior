/**
 * @implements
 * Classe FilterId per la gestione del filtro sull'evento.
 */
export default class FilterEvent {
  #cssSelector;

  #event;

  constructor(cssSelector) {
    this.#cssSelector = cssSelector;
  }

  getFilter() {
    return this.#event;
  }

  setFilter(filter) {
    this.#event = filter;
  }
}
