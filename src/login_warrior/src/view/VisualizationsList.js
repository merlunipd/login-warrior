export default class VisualizationsList {
  #cssSelector;

  constructor(cssSelector) {
    this.#cssSelector = cssSelector;
  }

  show(booleanValues) {
    if (booleanValues) {
      document.querySelector(this.#cssSelector).style.display = 'block';
    } else {
      document.querySelector(this.#cssSelector).style.display = 'none';
    }
  }
}
