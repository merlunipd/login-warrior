import SampleDatasetButton from './SampleDatasetButton.js';
describe('Unit Testing SampleDatasetButton', () => {
    const obj = new SampleDatasetButton('css');

    test('Uguaglianza tra oggetti', () => {
      const sampleDatasetButton = new SampleDatasetButton('css');
      expect(sampleDatasetButton).toStrictEqual(obj);
    });
});