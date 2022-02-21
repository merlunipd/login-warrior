// Importa moduli necessari
import { drawScatterPlot, updateScatterPlot } from './modules/scatterplot.js';
import { readDB } from '../../shared/modules/indexdDB.js';
import { saveSession } from '../../shared/modules/session.js';

// Carica sessione: dati e configurazione
const session = await readDB();
const { data } = session;
let { configuration } = session;

// Disegna il grafico
drawScatterPlot(data);

// Funzione filtro per i dati
const filters = (entry) => {
  const tipoEvento = entry.tipoEvento === configuration.filterLogins
    || entry.tipoEvento === configuration.filterErrors
    || entry.tipoEvento === configuration.filterLogouts;
  const utente = configuration.filtroUtente
    ? entry.utente === configuration.filtroUtente
    : true;
  const ip = configuration.filtroIp
    ? entry.ip === configuration.filtroIp
    : true;
  return tipoEvento && utente && ip;
};

// Collega DOM con gli eventi
const loginCheckbox = document.querySelector('#login-checkbox');
const errorCheckbox = document.querySelector('#error-checkbox');
const logoutCheckbox = document.querySelector('#logout-checkbox');
const filtroUtente = document.querySelector('#filtro-utente');
const filtroIp = document.querySelector('#filtro-ip');
const saveSessionButton = document.querySelector('#save-session-button');
const homeButton = document.querySelector('#home-button');

loginCheckbox.addEventListener('change', () => {
  if (loginCheckbox.checked) {
    configuration.filterLogins = '1';
  } else {
    configuration.filterLogins = '';
  }
  updateScatterPlot(data, data.filter(filters));
});

errorCheckbox.addEventListener('change', () => {
  if (errorCheckbox.checked) {
    configuration.filterErrors = '2';
  } else {
    configuration.filterErrors = '';
  }
  updateScatterPlot(data, data.filter(filters));
});

logoutCheckbox.addEventListener('change', () => {
  if (logoutCheckbox.checked) {
    configuration.filterLogouts = '3';
  } else {
    configuration.filterLogouts = '';
  }
  updateScatterPlot(data, data.filter(filters));
});

filtroUtente.addEventListener('input', (event) => {
  configuration.filtroUtente = event.target.value;
  updateScatterPlot(data, data.filter(filters));
});

filtroUtente.addEventListener('input', (event) => {
  configuration.filtroUtente = event.target.value;
  updateScatterPlot(data, data.filter(filters));
});

filtroIp.addEventListener('input', (event) => {
  configuration.filtroIp = event.target.value;
  updateScatterPlot(data, data.filter(filters));
});

saveSessionButton.addEventListener('click', () => {
  saveSession(data, configuration);
});

homeButton.addEventListener('click', () => {
  window.location.href = '../home';
});

// Configurazione: ricarica o imposta nuova
if (configuration) {
  loginCheckbox.checked = !!configuration.filterLogins;
  errorCheckbox.checked = !!configuration.filterErrors;
  logoutCheckbox.checked = !!configuration.filterLogouts;
  filtroUtente.value = configuration.filtroUtente;
  filtroIp.value = configuration.filtroIp;

  // E' sufficiente il trigger di un solo evento per applicare tutti i filtri al grafico
  filtroUtente.dispatchEvent(new Event('input'));
} else {
  configuration = {
    pathToPage: window.location.pathname,
    filterLogins: '1',
    filterErrors: '2',
    filterLogouts: '3',
    filtroUtente: '',
    filtroIp: '',
  };
}
