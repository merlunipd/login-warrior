import FilterButton from './FilterButton.js';

describe('Unit Testing FilterButton', () => {
    const obj = new FilterButton('css');

    test('Uguaglianza tra oggetti', () => {
      const filterButton = new FilterButton('css');
      expect(filterButton).toStrictEqual(obj);
    });

    test('Test doc', () => {
     expect(obj.setClick("click")).toBeCalled();;
    });
}); 