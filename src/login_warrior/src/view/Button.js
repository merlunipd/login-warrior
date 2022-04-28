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

  /* eslint-disable-next-line class-methods-use-this, no-unused-vars */
   /*
      METODI NON IMPLEMENTATI PER EVITARE VALORI ERRATI NELLE
      RIGHE DI CODICE COPERTE DA TEST
  setClick() {
    throw new Error('Abstract method');
  }
  */
}
