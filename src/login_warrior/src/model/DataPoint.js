/**
 * Classe contenitore per il singolo dato di login
 */
export default class DataPoint {
  #id;

  #ip;

  #date;

  #event;

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
}
