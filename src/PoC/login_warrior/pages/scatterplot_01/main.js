// Importa moduli necessari
import { drawScatterPlot, updateScatterPlot } from "./modules/scatterplot.js";
import { readDB } from '../../shared/modules/indexdDB.js';
import { saveSession } from '../../shared/modules/session.js';


// Carica sessione: dati e configurazione
const session = await readDB();
const data = session.data;
let configuration = session.configuration;



// Disegna il grafico
drawScatterPlot(data);



// Collegare il DOM con gli eventi
document.querySelector("#filtro-evento").addEventListener("input", (event) => {
  configuration.filtroEvento = event.target.value;
  if (configuration.filtroEvento) {
    updateScatterPlot(data, data.filter(d => d.tipoEvento === configuration.filtroEvento));
  } else {
    updateScatterPlot(data, data);
  }
});

document.querySelector("#save-session-button").addEventListener("click", () => {
  saveSession(data, configuration);
});



// Configurazione: ricarica o imposta nuova
if (configuration) {
  document.querySelector("#filtro-evento").value = configuration.filtroEvento;
  document.querySelector("#filtro-evento").dispatchEvent(new Event('input'));
} else {
  configuration = {
    pathToPage: window.location.pathname,
    filtroEvento: ""
  };
}
