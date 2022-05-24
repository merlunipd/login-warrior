import LoadSessionButton from './LoadSessionButton.js';
describe('Unit Testing LoadSessionButton', () => {
    const obj = new LoadSessionButton('css');

    test('Uguaglianza tra oggetti', () => {
      const loadSessionButton = new LoadSessionButton('css');
      expect(loadSessionButton).toStrictEqual(obj);
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