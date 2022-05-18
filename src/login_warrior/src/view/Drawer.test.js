import Drawer from './Drawer.js';

describe('Unit Testing Drawer', () => {
  // Test su istanziazione di Drawer
  test('Istanziazione Drawer', () => {
    /* eslint-disable-next-line no-new */
    expect(() => { new Drawer(); }).toThrowError(new Error('Interfaces can not be instantiated'));
  });

});