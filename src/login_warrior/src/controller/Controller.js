/**
 * Classe base astratta per il controller
 * @abstract
 */
 export default class Controller {
    constructor() {
      this.setup();
    }
  
    setup() {
      this.setupStorage();
      this.setupModel();
      this.setupView();
    }
  
    setupStorage() {
      throw new Error("Metodo astratto")
    }
  
    setupModel() {
      throw new Error("Metodo astratto")
    }
  
    setupView() {
      throw new Error("Metodo astratto")
    }
  }
  