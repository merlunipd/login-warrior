/* eslint-disable no-unused-vars */
import Button from './Button.js';
/* eslint-enable no-unused-vars */

/**
 * @implements {Button}
 *
 * Classe per il bottone che permette di caricare una sessione salvata.
 */

export default class LoadSessionButton{
    #cssSelector;

    constructor(cssSelector){
        this.#cssSelector = cssSelector;
    }

    setClick(function){
        document.querySelector(this.#cssSelector).addEventListener('click', function);
    }
}