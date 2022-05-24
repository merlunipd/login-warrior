import VisualizationView from './VisualizationView.js';
describe('Unit Testing VisualizationView', () => {
    const obj = new VisualizationView(1);
    const obj2 = new VisualizationView(2);
    const obj3 = new VisualizationView(3);
    const obj100 = new VisualizationView(100);

    test('Uguaglianza tra oggetti con index 1', () => {
      const visualizationView = new VisualizationView(1);
      expect(visualizationView).toStrictEqual(obj);
    });

    test('Uguaglianza tra oggetti con index 2', () => {
      const visualizationView = new VisualizationView(2);
      expect(visualizationView).toStrictEqual(obj2);
    });
    test('Uguaglianza tra oggetti con index 3', () => {
      const visualizationView = new VisualizationView(3);
      expect(visualizationView).toStrictEqual(obj3);
    });


    test('Uguaglianza tra oggetti con index sbagliato', () => {
        const visualizationView = new VisualizationView(100);
        expect(visualizationView).toStrictEqual(obj100);
      });
});