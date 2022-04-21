import VisualizationsController from "../../controller/VisualizationsController.js";
const visualizationsController = new VisualizationsController();

/*
 Firefox: quando si naviga tra le pagine con i comandi del browser,
 non viene rieseguito il codice JS. Questa riga serve per forzare
 la ri-esecuzione.
*/ 
window.onunload = function(){}; 