/* eslint-disable no-unused-vars */
import Button from './Button.js';
import JsDom from './JsDomImport.js';
/* eslint-enable no-unused-vars */

/**
 * @implements {Button}
 *
 * Classe per il bottone che permette di salvare una sessione di lavoro.
 */

export default class SaveButton {
  cssSelector;

  constructor(cssSelector) {
    this.cssSelector = cssSelector;
  }

  setClick(f) {
    document.querySelector(this.cssSelector).addEventListener('click', f);
  }
}
