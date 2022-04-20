/* eslint-disable no-unused-vars */
import Button from './Button.js';
/* eslint-enable no-unused-vars */

/**
 * @implements {Button}
 *
 * Classe per il bottone che permette di caricare il dataset.
 */

export default class LoadDatasetButton{
    #cssSelector;

    constructor(cssSelector){
        this.#cssSelector = cssSelector;
    }

    setClick(f){
        document.querySelector(this.#cssSelector).addEventListener('click', f);
    }
}