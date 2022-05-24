import HomeButton from './HomeButton.js';
describe('Unit Testing HomeButton', () => {
    const obj = new HomeButton('css');

    test('Uguaglianza tra oggetti', () => {
      const homeButton = new HomeButton('css');
      expect(homeButton).toStrictEqual(obj);
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