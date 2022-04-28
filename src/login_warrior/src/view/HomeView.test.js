import HomeView from './HomeView.js';
describe('Unit Testing HomeView', () => {
    const obj = new HomeView();

    test('Uguaglianza tra oggetti', () => {
      const homeView = new HomeView();
      expect(homeView).toStrictEqual(obj);
    });
});