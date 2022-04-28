import Button from './Button.js';

describe('Unit Testing Button', () => {
  // Test su istanziazione di Button
  test('Istanziazione Button', () => {
    /* eslint-disable-next-line no-new */
    expect(() => { new Button(); }).toThrowError(new Error('Interfaces can not be instantiated'));
  });
  
});
