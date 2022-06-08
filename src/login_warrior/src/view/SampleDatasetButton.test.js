import SampleDatasetButton from './SampleDatasetButton.js';
import JsDom from './JsDomImport.js';
describe('Unit Testing SampleDatasetButton', () => {
    const obj = new SampleDatasetButton('css');

    test('Uguaglianza tra oggetti', () => {
      const sampleDatasetButton = new SampleDatasetButton('css');
      expect(sampleDatasetButton).toStrictEqual(obj);
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