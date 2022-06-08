import VisualizationView from './VisualizationView.js';

describe('Unit Testing VisualizationView', () => {
  const obj = new VisualizationView(1);
  const obj2 = new VisualizationView(2);
  const obj3 = new VisualizationView(3);
  const obj5 = new VisualizationView(5);
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

  test('Test creazione index 4', () => {
    let thrownError;
    try {
      const obj4 = new VisualizationView(4);
      const visualizationView = new VisualizationView(4);
    } catch (error) {
      thrownError = error;
    }
    expect(String(thrownError)).toMatch('d3 is not defined');
  });

  test('Test creazione index 5', () => {
    let thrownError;
    try {
      const obj5 = new VisualizationView(5);
      const visualizationView = new VisualizationView(5);
    } catch (error) {
      thrownError = error;
    }
    expect(String(thrownError)).toMatch('undefined');
  });

  test('Uguaglianza tra oggetti con index sbagliato', () => {
    const visualizationView = new VisualizationView(100);
    expect(visualizationView).toStrictEqual(obj100);
  });
});
