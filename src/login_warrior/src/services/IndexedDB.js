import { Storage } from "./Storage";
//import * as DexieLibrary from "https://unpkg.com/dexie/dist/dexie.js";
import Dexie from "dexie"

/*
    ISTRUZIONI:
        Per testing: 
            -eseguire 'npm install dexie' da terminale
            -togliere commento '//import Dexie from "dexie";'

        Per esecuzione:
            -togliere come commento '//import * as DexieLibrary from "https://unpkg.com/dexie/dist/dexie.js";'
*/

/**
 * @class IndexedDB
 * @extends Storage
 */
export class IndexedDB /**extends Storage */{
    #db=null;

    /**
     * @constructor
     */
    constructor() {
        this.#db = new Dexie("IndexedDataBase");
        this.#db.version(1).stores({
            Dataset: "++id, data", 
            Customization: "++id, data", 
            Visualization: "++id, data"
        });
    }

    /** 
     * @param {Dataset} d
     * @returns {void} nothing
     */
    async saveDataset(d){
        this.#db.Dataset.add(
            {data: d}
        );
    }

    /**
     * @param {void} nothing
     * @returns {Object} obj{id,data}
     */
    async loadDataset(){
        return await this.#db.Dataset.where("id").equals(1).first();
    }

    /** 
     * @param {Customization} c
     * @returns {void} nothing
     */
    async saveCustomization(c){
        this.#db.Customization.add(
            {data: c}
        );
    }

    /**
     * @param {void} nothing
     * @returns {Object} obj{id,data}
     */
    async loadCustomization(){
        return await this.#db.Customization.where("id").equals(1).first();
    }

    /** 
     * @param {number} index  
     * @returns {void} nothing
     */
    async saveVisualizationIndex(index){
        await this.#db.Visualization.add(
            {data: index}
        );
    }

    /**
     * @param {void} nothing
     * @returns {Object} obj{id,data}
     */
    async loadVisualizationIndex(){
        return await this.#db.Visualization.where("id").equals(1).first();
    }
}