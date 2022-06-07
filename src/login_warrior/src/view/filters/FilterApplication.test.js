import FilterApplication from './FilterApplication.js';
import JsDom from '../JsDomImport.js';
describe('Unit Testing FilterApplication', () => {
    const obj = new FilterApplication('css');

    test('Uguaglianza tra oggetti', () => {
      const filterApplication = new FilterApplication('css');
      expect(filterApplication).toStrictEqual(obj);
    });

    test('Test getDomObject()', () => {
      expect(obj.getDomObject()).toBeNull();
     });
});