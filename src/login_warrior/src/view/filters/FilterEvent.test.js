import FilterEvent from './FilterEvent.js';
describe('Unit Testing FilterEvent', () => {
    const obj = new FilterEvent('css');

    test('Uguaglianza tra oggetti', () => {
      const filterEvent = new FilterEvent('css');
      expect(filterEvent).toStrictEqual(obj);
    });
});