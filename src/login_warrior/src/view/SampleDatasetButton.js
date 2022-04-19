/* eslint-disable no-unused-vars */
import Button from './Button.js';
/* eslint-enable no-unused-vars */

/**
 * @implements {Button}
 *
 * Classe per il bottone che permette di eseguire un nuovo campionamento.
 */

export default class SampleDatasetButton{
    #cssSelector;

    constructor(cssSelector){
        this.#cssSelector = cssSelector;
    }

    setClick(function){
        document.querySelector(this.#cssSelector).addEventListener('click', function);
    }
}