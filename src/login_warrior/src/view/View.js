/**
 * @interface
 *
 * Interfaccia per la vista.
 * Utile per avere un tipo di supporto per astrarre le classi principali della vista.
 */
export default class View {
  constructor() {
    throw new Error('Interfaces can not be instantiated');
  }
}
