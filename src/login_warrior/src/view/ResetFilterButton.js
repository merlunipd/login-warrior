/* eslint-disable no-unused-vars */
import Button from './Button.js';
import JsDom from './JsDomImport.js';
/* eslint-enable no-unused-vars */

/**
 * @implements {Button}
 *
 * Classe per il bottone che permette di resettare i filtri sui dati.
 */

export default class ResetFilterButton {
  cssSelector;

  constructor(cssSelector) {
    this.cssSelector = cssSelector;
  }

  setClick(f) {
      document.querySelector(this.cssSelector).addEventListener('click', f);
  }

}
