import { Storage } from "./Storage";

class IdexedDB /** implements Storage */{
    #db;

    constructor() {
        const request = indexedDB.open("Login-Warrior");

        request.onupgradeneeded = e => {
            db = e.target.result;
            const data = db.createObjectStore("Data", { autoIncrement: true });
            alert("DB aggiornato");
        }
        request.onsuccess = e => {
            db = e.target.result;
            alert("DB creato");
        }
        request.onerror = e => {
            alert("Errore nell'apertura del DB");
        }

        this.#db.request.result;
    }

    saveDataset(d){}

    loadDataset(){}

    saveCustomization(c){}

    loadCustomization(){}

    saveVisualizationIndex(index){}

    loadVisualizationIndex(){}
}