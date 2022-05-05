import HomeController from '../../controller/HomeController.js';

/* eslint-disable-next-line no-unused-vars */
let homeController;// = new HomeController();

/*
 Firefox: quando si naviga tra le pagine con i comandi del browser,
 non viene rieseguito il codice JS. Questa riga serve per forzare
 la ri-esecuzione.
*/
/* eslint-disable-next-line func-names */
window.onunload = function () { };

async function nascondiLoadingScreen() {
  homeController = await new HomeController().setup();
  document.getElementById('loading_screen').style.display = 'none';
}
// eslint-disable-next-line func-names
(function () {
  if (window.addEventListener) {
    window.addEventListener('load', nascondiLoadingScreen, false);
  } else {
    window.attachEvent('onload', nascondiLoadingScreen);
  }
}());
