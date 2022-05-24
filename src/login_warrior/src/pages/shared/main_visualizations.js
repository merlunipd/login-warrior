import VisualizationsController from '../../controller/VisualizationsController.js';

/* eslint-disable-next-line no-unused-vars */
let visualizationsController;

/*
 Firefox: quando si naviga tra le pagine con i comandi del browser,
 non viene rieseguito il codice JS. Questa riga serve per forzare
 la ri-esecuzione.
*/
/* eslint-disable-next-line func-names */
window.onunload = function () {};

async function nascondiLoadingScreen() {
  visualizationsController = await new VisualizationsController().setup();
  setTimeout(() => { document.getElementById('loading_screen').style.display = 'none'; }, 1000);
}
// eslint-disable-next-line func-names
(function () {
  if (window.addEventListener) {
    window.addEventListener('load', nascondiLoadingScreen, false);
  } else {
    window.attachEvent('onload', nascondiLoadingScreen);
  }
}());
