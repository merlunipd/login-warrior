/* eslint-disable class-methods-use-this */
/**
 * @interface
 *
 * Interfaccia per la realizzazione dei grafici.
 * Ogni diversa tipologia di grafico implementerà questa interfaccia.
 */
export default class Drawer {
  constructor() {
    throw new Error('Interfaces can not be instantiated');
  }

  // eslint-disable-next-line no-unused-vars
  draw(dataset) {
    throw new Error('Metodo astratto');
  }
}
