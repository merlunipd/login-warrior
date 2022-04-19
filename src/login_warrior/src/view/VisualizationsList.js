export default class VisualizationsList {
    #cssSelector

    constructor(cssSelector){
        this.#cssSelector = cssSelector;
    }

    hide(){
        document.getElementById(this.#cssSelector).style.display = 'none'; // hide
    }

    show(){
        document.getElementById(this.#cssSelector).style.display = ''; // show
    }
}