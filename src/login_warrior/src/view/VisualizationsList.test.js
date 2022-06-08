import VisualizationsList from './VisualizationsList.js';
import JsDom from './JsDomImport.js';
describe('Unit Testing VisualizationsList', () => {
    const obj = new VisualizationsList('css');

    test('Uguaglianza tra oggetti', () => {
      const visual = new VisualizationsList('css');
      expect(visual).toStrictEqual(obj);
    });



    test('show(booleanValues), booleanValues = true', () => {
      let thrownError;
      try {
        const boolean = true;
        obj.show(boolean);
      } catch (error) {
        thrownError = error;
      }
      expect(String(thrownError)).toMatch('TypeError: Cannot read properties of null (reading \'style\')');
     });

     test('show(booleanValues), booleanValues = false', () => {
      let thrownError;
      try {
        const boolean = false;
        obj.show(boolean);
      } catch (error) {
        thrownError = error;
      }
      expect(String(thrownError)).toMatch('TypeError: Cannot read properties of null (reading \'style\')');
     });

});