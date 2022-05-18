import LoadSessionButton from './LoadSessionButton.js';
describe('Unit Testing LoadSessionButton', () => {
    const obj = new LoadSessionButton('css');

    test('Uguaglianza tra oggetti', () => {
      const loadSessionButton = new LoadSessionButton('css');
      expect(loadSessionButton).toStrictEqual(obj);
    });
});