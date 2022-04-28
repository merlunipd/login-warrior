import View from './View.js';

describe('Unit Testing View', () => {
  // Test su istanziazione di View
  test('Istanziazione View', () => {
    expect(() => { new View(); }).toThrowError(new Error('Interfaces can not be instantiated'));
  });
  
});
