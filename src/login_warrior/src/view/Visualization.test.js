import Customizations from './Customizations.js';
import Drawer from './Drawer.js';
import Visualization from './Visualization.js';

describe('Unit Testing Visualization', () => {

    const emptyVisualization = new Visualization();

    test('Creazione oggetto Visualization con Customization e Drawer che sono interfacce', () => {
        expect(() => { new Visualization('cssSelector', new Customizations(), new Drawer()); }).toThrowError(new Error('Interfaces can not be instantiated'));
      });

      test('Getter customizations', () => {
        const variable = emptyVisualization.getCustomizations();
        expect(variable).toBeUndefined();
      });

      test('Setter customizations', () => {
        const visualization = new Visualization();
        visualization.setCustomizations("custo");
        expect(visualization.getCustomizations()).toBe("custo");
      });
      
      test('Test drawer()', () => {
        let thrownError;
        try {
          (emptyVisualization.draw());
        } catch (error) {
          thrownError = error;
        }
        expect(String(thrownError)).toMatch('Cannot read properties of undefined (reading \'draw\')');
       });


});