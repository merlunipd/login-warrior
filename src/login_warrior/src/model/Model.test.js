import Model from './Model.js';

describe('Unit Testing Model', () => {
  //Test su istanziazione di Model
  test('Istanziazione Model', () => {
    expect( () => {new Model()} ).toThrowError(new Error('Interfaces can not be instantiated'));
});
});