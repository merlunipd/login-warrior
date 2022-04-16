// eslint-disable-next-line no-unused-vars
import Customizations from './Customizations';
// eslint-disable-next-line no-unused-vars
import Drawer from './Drawer';

/**
 * @class
 *
 * Classe per la visualizzazione e la personalizzazione dei grafici.
 */
export default class Visualization {
  #cssSelector;

  #customizations;

  #drawer;

  /**
   *
   * @param {cssSelector} cssSelector
   * @param {Customizations} customizations
   * @param {Drawer} drawer
   */
  constructor(cssSelector, customizations, drawer) {
    this.#cssSelector = cssSelector;
    this.#customizations = customizations;
    this.#drawer = drawer;
  }

  /**
   *
   * @returns {Customizations} customizations
   */
  getCustomizations() {
    return this.#customizations;
  }

  /**
   *
   * @param {Customizations} custom
   */
  setCustomizations(c) {
    this.#customizations = c;
  }

  /**
   *
   * @param {Dataset} dataset
   */
  draw(dataset) {
    this.#drawer.draw(dataset);
  }
}
