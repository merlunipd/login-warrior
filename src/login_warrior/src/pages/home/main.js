import HomeController from '../../controller/HomeController.js';

/* eslint-disable-next-line no-unused-vars */
const homeController = new HomeController();

/*
 Firefox: quando si naviga tra le pagine con i comandi del browser,
 non viene rieseguito il codice JS. Questa riga serve per forzare
 la ri-esecuzione.
*/
/* eslint-disable-next-line func-names */
window.onunload = function () { };
