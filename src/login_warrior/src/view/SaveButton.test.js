import SaveButton from './SaveButton.js';
describe('Unit Testing SaveButton', () => {
    const obj = new SaveButton('css');

    test('Uguaglianza tra oggetti', () => {
      const saveButton = new SaveButton('css');
      expect(saveButton).toStrictEqual(obj);
    });
});