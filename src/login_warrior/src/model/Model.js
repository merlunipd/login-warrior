/**
 * @interface
 * 
 * Interfaccia per il modello.
 * Utile per avere un tipo di supporto per astrarre le classi principali del modello.
 */
export default class Model {
  constructor() {
    throw new Error('Interfaces can not be instantiated');
  }
}
