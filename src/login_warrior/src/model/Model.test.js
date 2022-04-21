import Model from './Model.js';

describe('Unit Testing Model', () => {
  // Test su istanziazione di Model
  test('Istanziazione Model', () => {
    /* eslint-disable-next-line no-new */
    expect(() => { new Model(); }).toThrowError(new Error('Interfaces can not be instantiated'));
  });
});
