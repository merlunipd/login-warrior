import { Storage } from "./Storage";


test("Test non implementazione interfaccia Storage", () => {
    let thrownError;
    try {
      new Storage;
    }
    catch(error) {
     thrownError = error;
    }
    expect(thrownError).toEqual("Sono l'intefaccia Storage, non istanziarmi :(");
});

/**
test("saveDataset", () => {
  expect(Storage.saveDataset("d")).toBe("");
})

test("loadDataset", () => {
  expect(Storage.loadDataset()).toBe("");
})

test("saveCustomization", () => {
  expect(Storage.saveCustomization("c")).toBe("");
})

test("loadCustomization", () => {
  expect(Storage.loadCustomization()).toBe("");
})

test("saveVisualizationIndex", () => {
  expect(Storage.saveVisualizationIndex("v")).toBe("");
})

test("loadVisualizationIndex()", () => {
  expect(Storage.loadVisualizationIndex()).toBe("");
})

test("saveDataset", () => {
  expect(typeof Storage.saveDataset).toEqual("function");
})

test("loadDataset", () => {
  expect(typeof Storage.loadDataset).toEqual("function");
})

test("saveCustomization", () => {
  expect(typeof Storage.saveCustomization).toEqual("function");
})

test("loadCustomization", () => {
  expect(typeof Storage.loadCustomization()).toEqual("function");
})

test("saveVisualizationIndex", () => {
  expect(typeof Storage.saveVisualizationIndex).toEqual("function");
})

test("loadVisualizationIndex()", () => {
  expect(typeof Storage.loadVisualizationIndex()).toEqual("function");
})
*/