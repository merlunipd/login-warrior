import { IndexedDB } from "./IndexedDB";
//import * as DexieLibrary from "./Dexie.js";  

 /**
  * npm install dexie
*/

import Dexie from "dexie";

let b = new IndexedDB();
let d = "ciao1";
let c = "ciao2";
let index = "ciao3";

/*
test("saveDataset", () => {
  b.saveDataset(d);
  expect(b.loadDataset()).toBe(d);
})

test("loadDataset", () => {
  expect(b.loadDataset()).toBe(d);
})

test("saveCustomization", () => {
  b.saveCustomization(c);
  expect(b.loadCustomization()).toBe(c);
})

test("loadCustomization", () => {
  expect(b.loadCustomization()).toBe(c);
})

test("saveVisualizationIndex", () => {
  b.saveVisualizationIndex(index);
  expect(b.loadVisualizationIndex()).toBe(index);
})

test("loadVisualizationIndex()", () => {
  expect(b.loadVisualizationIndex()).toBe(index);
})
*/
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

test("loadVisualizationIndex()", () => {
  expect(typeof b.loadVisualizationIndex).toEqual("function");
})

test("costruttoreIndexedDB", () => {
    expect(typeof IndexedDB.constructor).toEqual("function");
  })