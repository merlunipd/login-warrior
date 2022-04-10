/**
 * @class
 * @constructor
 * @saveDataset
 * @loadDataset
 * @saveCustomization
 * @loadCustomization
 * @saveVisualizationIndex
 * @loadVisualizationIndex
 */
class Storage{
    constructor(){
        throw("Sono l'intefaccia Storage, non istanziarmi :(");
    }

    saveDataset(d){}
    loadDataset(){}
    saveCustomization(c){}
    loadCustomization(){}
    saveVisualizationIndex(index){}
    loadVisualizationIndex(){}
}

export{Storage}