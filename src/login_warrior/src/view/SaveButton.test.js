import SaveButton from './SaveButton.js';
describe('Unit Testing SaveButton', () => {
    const obj = new SaveButton('css');

    test('Uguaglianza tra oggetti', () => {
      const saveButton = new SaveButton('css');
      expect(saveButton).toStrictEqual(obj);
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