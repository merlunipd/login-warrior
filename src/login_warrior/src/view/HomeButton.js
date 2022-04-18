/* eslint-disable no-unused-vars */
import Button from './Button.js';
/* eslint-enable no-unused-vars */

/**
 * @implements {Button}
 *
 * Classe per il bottone che permette di tornare alla schermata home.
 */

export default class HomeButton{
    #cssSelector;

    constructor(cssSelector){
        this.#cssSelector = cssSelector;
    }

    setClick(goHomeFunction){
        document.querySelector(this.#cssSelector).addEventListener('click', goHomeFunction)
    }
}