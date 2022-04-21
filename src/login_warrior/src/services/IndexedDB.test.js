import 'fake-indexeddb/auto';
import IndexedDB from './IndexedDB.js';

/*
    ISTRUZIONI:
      - eseguire da terminale 'npm install dexie'
      - eseguire da terminale 'npm install --save-dev fake-indexeddb'
      - andare in IndexedDB.js e rimuovere le barre di commento da '//import * as DexieLibrary from "https://unpkg.com/dexie/dist/dexie.js";'
*/

const b = new IndexedDB();
const d = 'InserireOggettoDataset';
const c = 'InserireOggettoCustomization';
const index = 'InserireOggettoIndice';
const obj = {
  number: [4, 4, 5, 6, 7, 5, 1, 2],
  string: ['oggetto prova database'],
};

test('NumberOfTuplesDataset', async () => {
  expect(await b.counterDataset()).toEqual(0);
});

test('NumberOfTuplesCustomization', async () => {
  expect(await b.counterCustomization()).toEqual(0);
});

test('NumberOfTuplesVisualization', async () => {
  expect(await b.counterVisualization()).toEqual(0);
});

test('loadVoidDatasetError', async () => {
  let thrownError;
  try {
    /* eslint-disable-next-line no-unused-expressions */
    (await b.loadDataset()).data;
  } catch (error) {
    thrownError = error;
  }
  expect(String(thrownError)).toMatch('TypeError: Cannot read properties of undefined (reading \'data\')');
});

test('loadVoidCustomizationError', async () => {
  let thrownError;
  try {
    /* eslint-disable-next-line no-unused-expressions */
    (await b.loadCustomization()).data;
  } catch (error) {
    thrownError = error;
  }
  expect(String(thrownError)).toMatch('TypeError: Cannot read properties of undefined (reading \'data\')');
});

test('loadVoidVisualizationIndexError', async () => {
  let thrownError;
  try {
    /* eslint-disable-next-line no-unused-expressions */
    (await b.loadVisualizationIndex()).data;
  } catch (error) {
    thrownError = error;
  }
  expect(String(thrownError)).toMatch('TypeError: Cannot read properties of undefined (reading \'data\')');
});

test('loadVoidDataset', async () => {
  expect(await b.loadVisualizationIndex()).toBeUndefined();
});

test('loadVoidCustomization', async () => {
  expect(await b.loadVisualizationIndex()).toBeUndefined();
});

test('loadVoidVisualizationIndex', async () => {
  expect(await b.loadVisualizationIndex()).toBeUndefined();
});

test('saveDataset', async () => {
  await b.saveDataset(d);
  expect((await b.loadDataset())).toBe(d);
});

test('loadDataset', async () => {
  expect((await b.loadDataset())).toBe(d);
});

test('saveCustomization', async () => {
  await b.saveCustomization(c);
  expect((await b.loadCustomization()).data).toBe(c);
});

test('loadCustomization', async () => {
  expect((await b.loadCustomization()).data).toBe(c);
});

test('saveVisualizationIndex', async () => {
  await b.saveVisualizationIndex(index);
  expect((await b.loadVisualizationIndex()).data).toBe(index);
});

test('loadVisualizationIndex', async () => {
  expect((await b.loadVisualizationIndex()).data).toBe(index);
});

test('saveDatasetObject', async () => {
  await b.saveDataset(obj);
  expect((await b.loadDataset())).toEqual(obj);
});

test('saveCustomizationObject', async () => {
  await b.saveCustomization(obj);
  expect((await b.loadCustomization()).data).toEqual(obj);
});

test('saveVisualizationIndexObject', async () => {
  await b.saveVisualizationIndex(obj);
  expect((await b.loadVisualizationIndex()).data).toEqual(obj);
});

test('NumberOfTuplesDataset', async () => {
  expect(await b.counterDataset()).toEqual(1);
});

test('NumberOfTuplesCustomization', async () => {
  expect(await b.counterCustomization()).toEqual(1);
});

test('NumberOfTuplesVisualization', async () => {
  expect(await b.counterVisualization()).toEqual(1);
});

test('saveDataset', () => {
  expect(typeof b.saveDataset).toEqual('function');
});

test('loadDataset', () => {
  expect(typeof b.loadDataset).toEqual('function');
});

test('saveCustomization', () => {
  expect(typeof b.saveCustomization).toEqual('function');
});

test('loadCustomization', () => {
  expect(typeof b.loadCustomization).toEqual('function');
});

test('saveVisualizationIndex', () => {
  expect(typeof b.saveVisualizationIndex).toEqual('function');
});

test('loadVisualizationIndex', () => {
  expect(typeof b.loadVisualizationIndex).toEqual('function');
});

test('costruttoreIndexedDB', () => {
  expect(typeof IndexedDB.constructor).toEqual('function');
});
