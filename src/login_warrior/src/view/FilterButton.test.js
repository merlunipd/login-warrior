import FilterButton from './FilterButton.js';

describe('Unit Testing FilterButton', () => {
    const obj = new FilterButton('css');

    test('Uguaglianza tra oggetti', () => {
      const filterButton = new FilterButton('css');
      expect(filterButton).toStrictEqual(obj);
    });

    test('Test setClick()', () => {
      let thrownError;
      try {
        (obj.setClick(""));
      } catch (error) {
        thrownError = error;
      }
      expect(String(thrownError)).toMatch('TypeError: Cannot read properties of null (reading \'addEventListener\')');
     });
}); 