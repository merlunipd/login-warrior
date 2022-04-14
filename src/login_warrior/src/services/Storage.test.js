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