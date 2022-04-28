import Customizations from './Customizations.js';

describe('Unit Testing Customizations', () => {
  // Test su istanziazione di Customizations
  test('Istanziazione Customizations', () => {
    /* eslint-disable-next-line no-new */
    expect(() => { new Customizations(); }).toThrowError(new Error('Interfaces can not be instantiated'));
  });
});