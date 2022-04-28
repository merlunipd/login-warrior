import Customizations from './Customizations.js';
import Drawer from './Drawer.js';
import Visualization from './Visualization.js';

describe('Unit Testing Visualization', () => {

    const emptyVisualization = new Visualization();

    test('Creazione oggetto Visualization con Customization e Drawer che sono interfacce', () => {
        expect(() => { new Visualization('cssSelector', new Customizations(), new Drawer()); }).toThrowError(new Error('Interfaces can not be instantiated'));
      });

      /* HA SENSO?
      test('Getter customizations', () => {
        const variable = emptyVisualization.getCustomizations();
        expect(variable).toBeUndefined();
      });*/

});