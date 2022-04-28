import ResetFilterButton from './ResetFilterButton.js';
describe('Unit Testing ResetFilterButton', () => {
    const obj = new ResetFilterButton('css');

    test('Uguaglianza tra oggetti', () => {
      const resetFilterButton = new ResetFilterButton('css');
      expect(resetFilterButton).toStrictEqual(obj);
    });
});