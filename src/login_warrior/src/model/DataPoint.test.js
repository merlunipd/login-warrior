import DataPoint from './DataPoint.js';

describe('Unit Testing DataPoint', () => {
  // DataPoint vuoto
  const dataPointNull = new DataPoint();

  test('Getter Id vuoto', () => {
    expect(dataPointNull.getId()).toBe(undefined);
  });
  test('Getter Ip vuoto', () => {
    expect(dataPointNull.getIp()).toBe(undefined);
  });
  test('Getter Date vuoto', () => {
    expect(dataPointNull.getDate()).toBe(undefined);
  });
  test('Getter Event vuoto', () => {
    expect(dataPointNull.getEvent()).toBe(undefined);
  });
  test('Getter Application vuoto', () => {
    expect(dataPointNull.getApplication()).toBe(undefined);
  });

  // DataPoint con parametri interi
  // Siccome gli attributi non hanno tipo allora è possibile usare qualsiasi tipo di dato
  const dataPointIntero = new DataPoint(18682, 18682, 18682, 18682, 18682);

  test('Getter Id con primitiva errata', () => {
    expect(dataPointIntero.getId()).toBe(18682);
  });
  test('Getter Ip con primitiva errata', () => {
    expect(dataPointIntero.getIp()).toBe(18682);
  });
  test('Getter Date con primitiva errata', () => {
    expect(dataPointIntero.getDate()).toBe(18682);
  });
  test('Getter Event con primitiva errata', () => {
    expect(dataPointIntero.getEvent()).toBe(18682);
  });
  test('Getter Application con primitiva errata', () => {
    expect(dataPointIntero.getApplication()).toBe(18682);
  });

  // DataPoint con dati
  const dataPoint = new DataPoint('18682', '92.223.250.4', new Date('2021-01-12 13:31:33.000'), 'login', 'ERM');

  test('Getter Id', () => {
    expect(dataPoint.getId()).toBe('18682');
  });
  test('Getter Ip', () => {
    expect(dataPoint.getIp()).toBe('92.223.250.4');
  });
  test('Getter Date', () => {
    expect(dataPoint.getDate()).toStrictEqual(new Date('2021-01-12 13:31:33.000'));
  });
  test('Getter Event', () => {
    expect(dataPoint.getEvent()).toBe('login');
  });
  test('Getter Application', () => {
    expect(dataPoint.getApplication()).toBe('ERM');
  });

  // DataPoint con dati ma senza ip
  // DataPoint con dati
  const dataPointNoIp = new DataPoint('18682', '', new Date('2021-01-12 13:31:33.000'), 'login', 'ERM');

  test('Getter Id vuoto', () => {
    expect(dataPointNoIp.getIp()).toBe('');
  });
});
