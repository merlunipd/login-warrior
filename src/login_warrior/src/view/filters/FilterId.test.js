import FilterId from './FilterId.js';
describe('Unit Testing FilterId', () => {
    const obj = new FilterId('css');

    test('Uguaglianza tra oggetti', () => {
      const filterId = new FilterId('css');
      expect(filterId).toStrictEqual(obj);
    });

    test('Test getDomObject()', () => {
      expect(obj.getDomObject()).toBeNull();
     });
});