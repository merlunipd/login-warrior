import parseCsv from './parseCsv.js';

describe('CSV parsing', () => {
  test('CSV con alcuni log di Zucchetti', () => {
    const text = `38;59909150;2021-04-20 12:06:22.000;1;ERM;erm3zs02;93.51.242.42;"001       ";vzmblpjidr;tarrdglzwi
    40;436636107;2020-12-21 15:13:31.000;2;ERM;erm3zs02;79.51.75.159;"          ";"          ";i18u2zqv6c
    43;1300802;2021-04-12 08:54:58.000;1;ERM;erm3zs02;94.95.136.251;"001       ";lezbqhmgse;mmz995wuau`;
    const data = [
      {
        utente: '38',
        data: '2021-04-20 12:06:22.000',
        tipoEvento: '1',
        applicazione: 'ERM',
        ip: '93.51.242.42',
      },
      {
        utente: '40',
        data: '2020-12-21 15:13:31.000',
        tipoEvento: '2',
        applicazione: 'ERM',
        ip: '79.51.75.159',
      },
      {
        utente: '43',
        data: '2021-04-12 08:54:58.000',
        tipoEvento: '1',
        applicazione: 'ERM',
        ip: '94.95.136.251',
      },
    ];
    expect(parseCsv(text)).toEqual(data);
  });

  test('CSV vuoto', () => {
    const text = '';
    const data = [];
    expect(parseCsv(text)).toEqual(data);
  });
});
