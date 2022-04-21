/**
 * @interface Storage
 */

class Storage {
  constructor() {
    /* eslint-disable-next-line no-throw-literal */
    throw ("Sono l'intefaccia Storage, non istanziarmi :(");
  }
  /*
      METODI NON IMPLEMENTATI PER EVITARE VALORI ERRATI NELLE
      RIGHE DI CODICE COPERTE DA TEST
      saveDataset(d){}
      loadDataset(){}
      saveCustomization(c){}
      loadCustomization(){}
      saveVisualizationIndex(index){}
      loadVisualizationIndex(){}
  */
}

/* eslint-disable-next-line import/prefer-default-export */
export { Storage };
