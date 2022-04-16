/* eslint-disable class-methods-use-this */
/**
 * @interface
 *
 * Interfaccia per la gestione dei filtri.
 * Ogni diversa tipologia di filtro implementerà questa interfaccia.
 */
export default class FilterView {
  constructor() {
    throw new Error('Interfaces can not be instantiated');
  }

  getFilter() {
    throw new Error('Metodo astratto');
  }

  // eslint-disable-next-line no-unused-vars
  setFilter(filter) {
    throw new Error('Metodo astratto');
  }
}
