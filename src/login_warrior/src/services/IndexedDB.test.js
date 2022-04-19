import "fake-indexeddb/auto";
import { IndexedDB } from "./IndexedDB.js";

 /*
    ISTRUZIONI:
      - eseguire da terminale 'npm install dexie'
      - eseguire da terminale 'npm install --save-dev fake-indexeddb'
      - andare in IndexedDB.js e rimuovere le barre di commento da '//import * as DexieLibrary from "https://unpkg.com/dexie/dist/dexie.js";'
*/

import Dexie from "dexie";

let b = new IndexedDB();
let d = "InserireOggettoDataset";
let c = "InserireOggettoCustomization";
let index = "InserireOggettoIndice";

test("saveDataset", async () => {
  await b.saveDataset("Stringa da sovrascrivere");
  await b.saveDataset(d);
  expect((await b.loadDataset()).data).toBe(d);
})

test("loadDataset", async () => {
  expect((await b.loadDataset()).data).toBe(d);
})

test("saveCustomization", async () => {
  await b.saveCustomization(c);
  expect((await b.loadCustomization()).data).toBe(c);
})

test("loadCustomization", async () => {
  expect((await b.loadCustomization()).data).toBe(c);
})

test("saveVisualizationIndex", async () => {
  await b.saveVisualizationIndex(index);
  expect((await b.loadVisualizationIndex()).data).toBe(index);
})

test("loadVisualizationIndex", async () => {
  expect((await b.loadVisualizationIndex()).data).toBe(index);
})

test("saveDataset", () => {
  expect(typeof b.saveDataset).toEqual("function");
})

test("loadDataset", () => {
  expect(typeof b.loadDataset).toEqual("function");
})

test("saveCustomization", () => {
  expect(typeof b.saveCustomization).toEqual("function");
})

test("loadCustomization", () => {
  expect(typeof b.loadCustomization).toEqual("function");
})

test("saveVisualizationIndex", () => {
  expect(typeof b.saveVisualizationIndex).toEqual("function");
})

test("loadVisualizationIndex", () => {
  expect(typeof b.loadVisualizationIndex).toEqual("function");
})

test("costruttoreIndexedDB", () => {
    expect(typeof IndexedDB.constructor).toEqual("function");
  })
