import { Storage } from "./Storage";
//import * as DexieLibrary from "https://unpkg.com/dexie/dist/dexie.js";
//import * as DexieLibrary from "./Dexie.js";  
 /**
  * npm install dexie
*/

import Dexie from "dexie";

export class IndexedDB /**extends Storage */{
    #db;

    /**
     * TODO: trovare un modo per ottenere i "_value" dall'oggetto ritornato "dexie.promise"
     * 
    */
    constructor() {
        this.#db = new Dexie("DatabaseInfame");
        this.#db.version(1).stores({Dataset: "++id, data" , Customization: "++id, data", Visualization: "++id, data"});
    }

    saveDataset(d){
        this.#db.Dataset.put({data: d});
    }

    loadDataset(){
        const data = this.#db.Dataset.toArray();
        return data;
    }

    saveCustomization(c){
        this.#db.Customization.put({data: c});
    }

    loadCustomization(){
        const data = this.#db.Customization.toArray();
        return data;
    }

    saveVisualizationIndex(index){
        this.#db.Visualization.put({data: index});
    }

    loadVisualizationIndex(){
        const data = this.#db.Visualization.toArray();
        return data;
    }
}