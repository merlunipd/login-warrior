import ResetFilterButton from './ResetFilterButton.js';
describe('Unit Testing ResetFilterButton', () => {
    const obj = new ResetFilterButton('css');

    test('Uguaglianza tra oggetti', () => {
      const resetFilterButton = new ResetFilterButton('css');
      expect(resetFilterButton).toStrictEqual(obj);
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