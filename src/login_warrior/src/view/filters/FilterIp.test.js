import FilterIp from './FilterIp.js';
describe('Unit Testing FilterIp', () => {
    const obj = new FilterIp('css');

    test('Uguaglianza tra oggetti', () => {
      const filterIp = new FilterIp('css');
      expect(filterIp).toStrictEqual(obj);
    });

    test('Test getDomObject()', () => {
      expect(obj.getDomObject()).toBeNull();
     });
});