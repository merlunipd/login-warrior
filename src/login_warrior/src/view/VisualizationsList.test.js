import VisualizationsList from './VisualizationsList.js';
describe('Unit Testing VisualizationsList', () => {
    const obj = new VisualizationsList('css');

    test('Uguaglianza tra oggetti', () => {
      const visual = new VisualizationsList('css');
      expect(visual).toStrictEqual(obj);
    });
    /* NON SI PUO' TESTARE POICHE' IN QUESTO CASO DOCUMENT (è all'interno del metodo show()) NON È ANCORA DEFINITO?
        ReferenceError: document is not defined

    test('show(booleanValues), booleanValues = true', () => {
    const boolean = true;
    expect(visualizasionsList.show(boolean)).toBe('block');
  }); */
});