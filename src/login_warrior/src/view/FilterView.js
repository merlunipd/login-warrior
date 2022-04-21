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

  getDomObject() {
    throw new Error('Metodo astratto');
  }
}
