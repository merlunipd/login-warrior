import HomeButton from './HomeButton.js';
describe('Unit Testing HomeButton', () => {
    const obj = new HomeButton('css');

    test('Uguaglianza tra oggetti', () => {
      const homeButton = new HomeButton('css');
      expect(homeButton).toStrictEqual(obj);
    });
});