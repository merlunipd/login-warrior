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

  /* eslint-disable-next-line class-methods-use-this */
  setupStorage() {
    throw new Error('Metodo astratto');
  }

  /* eslint-disable-next-line class-methods-use-this */
  setupModel() {
    throw new Error('Metodo astratto');
  }

  /* eslint-disable-next-line class-methods-use-this */
  setupView() {
    throw new Error('Metodo astratto');
  }
}
