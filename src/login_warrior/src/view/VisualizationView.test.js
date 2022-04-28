import VisualizationView from './VisualizationView.js';
describe('Unit Testing VisualizationView', () => {
    const obj = new VisualizationView(1);
    const obj100 = new VisualizationView(100);

    test('Uguaglianza tra oggetti con index giusto', () => {
      const visualizationView = new VisualizationView(1);
      expect(visualizationView).toStrictEqual(obj);
    });

    test('Uguaglianza tra oggetti con index sbagliato', () => {
        const visualizationView = new VisualizationView(100);
        expect(visualizationView).toStrictEqual(obj100);
      });
});