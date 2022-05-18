import FilterView from './FilterView.js';

describe('Unit Testing FilterView', () => {
  // Test su istanziazione di FilterView
  test('Istanziazione FilterView', () => {
    /* eslint-disable-next-line no-new */
    expect(() => { new FilterView(); }).toThrowError(new Error('Interfaces can not be instantiated'));
  });

});