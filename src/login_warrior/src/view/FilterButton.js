/* eslint-disable no-unused-vars */
import Button from './Button.js';

/* eslint-enable no-unused-vars 

/**
 * @implements {Button}
 *
 * Classe per il bottone che permette di filtrare i dati.
 */

export default class FilterButton {
  cssSelector;

  constructor(cssSelector) {
    this.cssSelector = cssSelector;
  }

  setClick(f) {
      document.querySelector(this.cssSelector).addEventListener('click', f);
  }
}
