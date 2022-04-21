import VisualizationsController from '../../controller/VisualizationsController.js';

/* eslint-disable-next-line no-unused-vars */
const visualizationsController = new VisualizationsController();

/*
 Firefox: quando si naviga tra le pagine con i comandi del browser,
 non viene rieseguito il codice JS. Questa riga serve per forzare
 la ri-esecuzione.
*/
/* eslint-disable-next-line func-names */
window.onunload = function () {};
