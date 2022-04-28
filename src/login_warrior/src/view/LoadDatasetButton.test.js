import LoadDatasetButton from './LoadDatasetButton.js';
describe('Unit Testing LoadDatasetButton', () => {
    const obj = new LoadDatasetButton('css');

    test('Uguaglianza tra oggetti', () => {
      const loadDatasetButton = new LoadDatasetButton('css');
      expect(loadDatasetButton).toStrictEqual(obj);
    });
});