import CSV from './CSV.js';
import DataPoint from './DataPoint.js';
import Dataset from './Dataset.js';
import Filters from './Filters.js';

describe('Unit Testing Dataset', () => {
  // Variabili
  const csv = new CSV(`18684;722838627;2020-01-31 14:34:30.000;2;ERM;erm3zs02;92.223.250.4;"          ";"          ";khomw8yvg8
    18684;745267985;2019-12-23 07:14:20.000;2;ERM;erm3zs02;82.56.73.31;"          ";"          ";furfcrvvnh
    18686;2181738;2021-03-16 12:58:06.000;1;ERM;erm3zs02;92.223.250.4;"001       ";tbavqdzkzj;m2rr2ixqoy
    18686;6907333;2021-06-24 15:12:01.000;2;ERM;erm3zs02;92.223.250.4;"          ";"          ";fyh7jnb10z`);
  const samplesLimitTen = 10;
  const samplesLimitTwo = 2;
  const noFilters = new Filters(null, null, null, null, null);
  const dataSetNoFilter = new Dataset(csv, noFilters);
  const filters = new Filters('18684', '92.223.250.4', new Date('2020-01-31 14:34:30.000'), 'error', 'ERM');
  const dataSetFilter = new Dataset(csv, filters);

  // Dataset vuoto
  test('Creazione Dataset vuoto', () => {
    /* eslint-disable-next-line no-new */
    expect(() => { new Dataset(); }).toThrowError(new Error('error parsing csv'));
  });

  // Dataset con parametri sbagliati
  test('Crea con paramentri sbagliati', () => {
    /* eslint-disable-next-line no-new */
    expect(() => { new Dataset(123, 123); }).toThrowError(new Error('error parsing csv'));
  });

  // Dataset con dati e no filtri

  test('Getter Dataset lenght, samplesLimit = 10, filtri vuoti', () => {
    const set = dataSetNoFilter.getDataset(samplesLimitTen, 1);
    expect(set.length).toBe(4);
  });
  test('Getter DatasetUnfiltered lenght, samplesLimit = 10, filtri vuoti', () => {
    const set = dataSetNoFilter.getDatasetUnfiltered(samplesLimitTen, 1);
    expect(set.length).toBe(4);
  });
  test('Getter Dataset lenght, samplesLimit = 2, filtri vuoti', () => {
    const set = dataSetNoFilter.getDataset(samplesLimitTwo, 1);
    expect(set.length).toBe(samplesLimitTwo);
  });
  test('Getter DatasetUnfiltered lenght, samplesLimit = 2, filtri vuoti', () => {
    const set = dataSetNoFilter.getDatasetUnfiltered(samplesLimitTwo, 1);
    expect(set.length).toBe(samplesLimitTwo);
  });
  test('Getter Dataset lenght, samplesLimit = 10, filtri vuoti', () => {
    const set = dataSetNoFilter.getDataset(samplesLimitTen, 2);
    expect(set.length).toBe(4);
  });
  test('Getter DatasetUnfiltered lenght, samplesLimit = 10, filtri vuoti', () => {
    const set = dataSetNoFilter.getDatasetUnfiltered(samplesLimitTen, 2);
    expect(set.length).toBe(4);
  });
  test('Getter Dataset lenght, samplesLimit = 2, filtri vuoti', () => {
    const set = dataSetNoFilter.getDataset(samplesLimitTwo, 2);
    expect(set.length).toBe(samplesLimitTwo);
  });
  test('Getter DatasetUnfiltered lenght, samplesLimit = 2, filtri vuoti', () => {
    const set = dataSetNoFilter.getDatasetUnfiltered(samplesLimitTwo, 2);
    expect(set.length).toBe(samplesLimitTwo);
  });
  test('Getter DatasetUnfilteredUnsampled lenght, filtri vuoti', () => {
    const set = dataSetNoFilter.getDatasetUnfilteredUnsampled();
    expect(set.length).toBe(4);
  });
  test('Getter DatasetUnsampled lenght, filtri vuoti', () => {
    const set = dataSetNoFilter.getDatasetUnsampled();
    expect(set.length).toBe(4);
  });
  test('Getter filter, filtri vuoti', () => {
    expect(dataSetNoFilter.getFilters()).toStrictEqual(new Filters(null, null, null, null, null));
  });
  test('Setter filter, filtri vuoti', () => {
    dataSetNoFilter.setFilters(new Filters('18684', '92.223.250.4', new Date('2020-01-31 14:34:30.000'), 'login', 'ERM'));
    expect(dataSetNoFilter.getFilters()).toStrictEqual(new Filters('18684', '92.223.250.4', new Date('2020-01-31 14:34:30.000'), 'login', 'ERM'));
  });

  // Dataset con dati e no filtri

  test('Getter Dataset lenght, samplesLimit = 10', () => {
    const set = dataSetFilter.getDataset(samplesLimitTen);
    expect(set.length).toBe(1);
  });

  test('Getter DatasetUnfiltered lenght, samplesLimit = 10', () => {
    const set = dataSetFilter.getDatasetUnfiltered(samplesLimitTen);
    expect(set.length).toBe(4);
  });
  test('Getter Dataset lenght, samplesLimit = 2', () => {
    const set = dataSetFilter.getDataset(samplesLimitTwo);
    expect(set.length).toBe(1);
  });
  test('Getter DatasetUnfiltered lenght, samplesLimit = 2', () => {
    const set = dataSetFilter.getDatasetUnfiltered(samplesLimitTwo);
    expect(set.length).toBe(samplesLimitTwo);
  });
  test('Getter DatasetUnfilteredUnsampled lenght', () => {
    const set = dataSetFilter.getDatasetUnfilteredUnsampled();
    expect(set.length).toBe(4);
  });
  test('Getter DatasetUnsampled lenght', () => {
    const set = dataSetFilter.getDatasetUnsampled();
    expect(set.length).toBe(1);
  });
  test('Getter filter', () => {
    expect(dataSetFilter.getFilters()).toStrictEqual(new Filters('18684', '92.223.250.4', new Date('2020-01-31 14:34:30.000'), 'error', 'ERM'));
  });
  test('Setter filter', () => {
    dataSetFilter.setFilters(new Filters('223', null, null, null, null));
    expect(dataSetFilter.getFilters()).toStrictEqual(new Filters('223', null, null, null, null));
  });
  test('newDatasetFromObject', () => {
    dataSetFilter.setFilters(filters);
    expect(Dataset.newDatasetFromObject(dataSetFilter)).toStrictEqual(dataSetFilter);
  });
  test('newDatasetFromObject, date == null', () => {
    dataSetFilter.setFilters(noFilters);
    expect(Dataset.newDatasetFromObject(dataSetFilter)).toStrictEqual(dataSetFilter);
  });
});
