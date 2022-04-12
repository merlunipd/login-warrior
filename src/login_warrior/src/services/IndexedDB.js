import { Storage } from "./Storage";


class IdexedDB extends Storage {
    #db;


    constructor() {
        const constructorPromise = new Promise(function(resolve,reject){
            resolve(request=indexedDB.open("Login-Warrior"));
        });

        constructorPromise.then(
            resolve => request.onsuccess = e =>{
                db = e.target.result;
                const datasetDB = db.createObjectStore("Data",{autoIncrement: true});  
                const customizationDB = db.createObjectStore("Data",{autoIncrement: true});
                const visualizationDB = db.createObjectStore("Data",{autoIncrement: true});
                
            },
            reject => alert("Errore nell'apertura del DB, ricaricare la pagina")
        )

        this.#db.request.result;
    }

    saveDataset(d){
        const constructorPromise = new Promise(function(resolve,reject){
            const request = indexedDB.open("Login-Warrior");
        });

        constructorPromise.then(
            resolve => this.#db = e.target.result,
            error => alert("Errore nell'aggiornamento del DB, ricaricare la pagina")
        )

        
    }

    loadDataset(){}

    saveCustomization(c){}

    loadCustomization(){}

    saveVisualizationIndex(index){}

    loadVisualizationIndex(){}
}

export{indexedDB}