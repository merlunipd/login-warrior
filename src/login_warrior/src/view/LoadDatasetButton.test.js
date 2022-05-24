import LoadDatasetButton from './LoadDatasetButton.js';
describe('Unit Testing LoadDatasetButton', () => {
    const obj = new LoadDatasetButton('css');

    test('Uguaglianza tra oggetti', () => {
      const loadDatasetButton = new LoadDatasetButton('css');
      expect(loadDatasetButton).toStrictEqual(obj);
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