/**
 * @interface
 *
 * Interfaccia per i bottoni.
 * Tutti i bottoni presenti nel'applicazione implementano questa interfaccia.
 */
 export default class Button {
    constructor() {
      throw new Error('Interfaces can not be instantiated');
    }

    setClick(function) {
      throw new Error('Abstract method')
    }
  }
  