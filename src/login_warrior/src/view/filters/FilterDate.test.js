import FilterDate from './FilterDate.js';
import JsDom from '../JsDomImport.js';
describe('Unit Testing FilterDate', () => {
    const obj = new FilterDate('css');

    test('Uguaglianza tra oggetti', () => {
      const filterDate = new FilterDate('css');
      expect(filterDate).toStrictEqual(obj);
    });

    test('Test getDomObject()', () => {
      expect(obj.getDomObject()).toBeNull();
     });
});