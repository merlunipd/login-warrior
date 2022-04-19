/**
 * Classe contenente i filtri sui dati
 */
export default class Filters {
  /**
   * Identificativo dell'utente
   * @type {string}
   */
  #id;

  /**
   * IP dell'utente
   * @type {string}
   */
  #ip;

  /**
   * Data dell'evento
   * @type {Date}
   */
  #date;

  /**
   * Esito evento (login, logout, error)
   * @type {string}
   */
  #event;

  /**
   * Applicazione a cui è stato richiesto l'accesso
   * @type {string}
   */
  #application;

  /**
   * @param {string} id ID utente
   * @param {string} ip IP utente
   * @param {Date} date Data del login
   * @param {string} event Evento (login, logout, error)
   * @param {string} application Applicazione a cui è stato richiesto l'accesso
   */
  constructor(id, ip, date, event, application) {
    this.#id = id;
    this.#ip = ip;
    this.#date = date;
    this.#event = event;
    this.#application = application;
  }

  /**
   * @returns {string} Ritorna l'ID utente
   */
  getId() {
    return this.#id;
  }

  /**
   * @returns {string} Ritorna l'IP utente
   */
  getIp() {
    return this.#ip;
  }

  /**
   * @returns {Date} Ritorna la data del login
   */
  getDate() {
    return this.#date;
  }

  /**
   * @returns {string} Ritorna l'evento (login, logout, error)
   */
  getEvent() {
    return this.#event;
  }

  /**
   * @returns {string} Ritorna l'applicazione a cui è stato richiesto l'accesso
   */
  getApplication() {
    return this.#application;
  }

  /**
   * @param {string} id Filtro sull'ID utente
   */
  setId(id) {
    this.#id = id;
  }

  /**
   * @param {string} ip Filtro sull'IP utente
   */
  setIp(ip) {
    this.#ip = ip;
  }

  /**
   * @param {Date} date Filtro sulla data del login
   */
  setDate(date) {
    this.#date = date;
  }

  /**
   * @param {string} event Filtro sull'evento
   */
  setEvent(event) {
    this.#event = event;
  }

  /**
   * @param {string} application Filtro sull'applicazione
   */
  setApplication(application) {
    this.#application = application;
  }
}
