/* eslint-disable no-unused-vars */
import Button from './Button.js';
import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window
/* eslint-enable no-unused-vars */

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
