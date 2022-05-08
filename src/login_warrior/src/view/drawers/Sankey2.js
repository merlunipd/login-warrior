export default class Sankey2 {

    // Variabili
    margin = { top: 50, right: 150, bottom: 50, left: 200 };

    width = 1500 - this.margin.left - this.margin.right;

    height = 800 - this.margin.top - this.margin.bottom;

    nodeWidth = 20;

    nodePadding = 5;

    nodeLayout = 30;

    sankey;

    nodes;

    links;

    color = d3.scaleOrdinal(d3.schemeCategory20);

    // Funzioni ausiliarie

    createSvg() {
     d3.select("#visualization")
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    };

    createSankey(){
        return d3.sankey()
            .nodeWidth(this.nodeWidth)
            .nodePadding(this.nodePadding)
            .size([this.width, this.height]);
    }

    parseDati(dataset){
        /*
        (da rifare con map al posto di array!)
        Reminder per il funzionamento:
            - nel controllo inserire l'index del nodo per facilità di recupero nella creazione dei link
            - aggiungere altre variabili di conta, che contano gli errori,login e logout degli orari e dei mesi, per facilitare il value dei link
            - possibilità di portare il parser fuori dalla classe!
        */   

        let nodes = [];
        let links = [];

        //Variabili controllo presenza per creazione nodi, undefined se elemento non disponibile, valore dell'index altrimenti
        let controlloId = new Map(); 
        let controlloTipologia = [];    //1-login, 2-error, 3-logout
        let controlloApplicazione = new Map();
        
        //Variabili conteggio per assegnazione al value di links
        let contaLoginId = new Map();
        let contaLoginApp = new Map();
        let contaLogoutId = new Map();
        let contaLogoutApp = new Map();
        let contaErrorId = new Map();
        let contaErrorApp = new Map();

        //indice dei nodi
        let index = 0;

        

        
        //Scorre tutti i dati e crea un nodo per ogni Id, tipologia e applicazione esistente, andando a contare i collegamenti tra i nodi
        for (let i = 0; i < dataset.length; i++) {

            let id = dataset[i].getId();
            let applicazione = dataset[i].getApplication();

            //Creazione nodi prima colonna: Id
            if (controlloId.has(id) === false) {
                nodes.push({ "node": index, "name": id });
                controlloId.set(id, index);
                contaLoginId.set(index, 0);
                contaLogoutId.set(index, 0);
                contaErrorId.set(index, 0);
                index++;
            }
            //Creazione nodi terza colonna: Applicazione
            if (controlloApplicazione.has(applicazione) === false) {
                nodes.push({ "node": index, "name": applicazione });
                controlloApplicazione.set(applicazione, index);
                contaLoginApp.set(index, 0);
                contaLogoutApp.set(index, 0);
                contaErrorApp.set(index, 0);
                index++;
            }
            let idIndex = controlloId.get(id);
            let appIndex = controlloApplicazione.get(applicazione);
            //Creazione nodi seconda colonna: login, errori, logout
            switch(dataset[i].getEvent()){
                case "login":
                    if( (typeof controlloTipologia[0]) == "undefined"){
                        nodes.push({"node":index,"name":"login"});
                        controlloTipologia[0]=index;
                        index++;
                    }
                    contaLoginId.set(idIndex, contaLoginId.get(idIndex)+1);
                    contaLoginApp.set(appIndex, contaLoginApp.get(appIndex)+1);
                    break;
                case "error":
                    if((typeof controlloTipologia[1]) == "undefined"){
                        nodes.push({"node":index,"name":"error"});
                        controlloTipologia[1]=index;
                        index++;
                    }
                    contaErrorId.set(idIndex, contaErrorId.get(idIndex)+1);
                    contaErrorApp.set(appIndex, contaErrorApp.get(appIndex)+1);
                    break;
                case "logout":
                    if((typeof controlloTipologia[2]) == "undefined"){
                        nodes.push({"node":index,"name":"logout"});
                        controlloTipologia[2]=index;
                        index++;
                    }
                    contaLogoutId.set(idIndex, contaLogoutId.get(idIndex)+1);
                    contaLogoutApp.set(appIndex, contaLogoutApp.get(appIndex)+1);
                    break;
                default:
                    throw new Error("Tipologia non valida");
            }
            
        }

        //links
        
        if ((typeof controlloTipologia[0]) != "undefined") {
            for (const [key, value] of contaLoginId) {
                if (value > 0) {
                    links.push({ "source": key, "target": controlloTipologia[0], "value": value });
                }
            }
            for (const [key, value] of contaLoginApp) {
                if (value > 0) {
                    links.push({ "source": controlloTipologia[0], "target": key, "value": value });
                }
            }
        }

        if ((typeof controlloTipologia[1]) != "undefined") {
            for (const [key, value] of contaErrorId) {
                if (value > 0) {
                    links.push({ "source": key, "target": controlloTipologia[1], "value": value });
                }
            }
            for (const [key, value] of contaErrorId) {
                if (value > 0) {
                    links.push({ "source": controlloTipologia[1], "target": key, "value": value });
                }
            }

        }
        if ((typeof controlloTipologia[2]) != "undefined") {
            for (const [key, value] of contaLogoutId) {
                if (value > 0) {
                    links.push({ "source": key, "target": controlloTipologia[2], "value": value });
                }
            }
            for (const [key, value] of contaLogoutApp) {
                if (value > 0) {
                    links.push({ "source": controlloTipologia[2], "target": key, "value": value });
                }
            }
        }
        return [nodes, links];
    }
    
    
    drawNodeLink(dataset, color, height, sankey){
        [this.nodes , this.links] = this.parseDati(dataset);
        // Genere un diagramma sankey con i dati in ingresso.
        this.sankey.nodes(this.nodes)
            .links(this.links)
            .layout(this.nodeLayout);

        // Inserisce i link
        let link = d3.select('svg g')
            .append('g')
            .selectAll(".link")
            .data(this.links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", this.sankey.link())
            .style("stroke-width", function (d) { return Math.max(1, d.dy); })
            .sort(function (a, b) { return b.dy - a.dy; });

        // Inserisce i nodi
        let node = d3.select('svg g')
            .append('g')
            .selectAll(".node")
            .data(this.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {return "translate(" + d.x + "," + d.y + ")"; })
            .call(d3.drag()
                .subject(function (d) { return d; })
                .on("start", function () { this.parentNode.appendChild(this); })
                .on("drag", dragmove));

        // Aggiunge i rettangoli ai nodi
        node
            .append("rect")
            .attr("height", function (d) { return d.dy; })
            .attr("width", this.sankey.nodeWidth())
            .style("fill", function (d) { return d.color = color(d.name.replace(/ .*/, "")); })
            .style("stroke", function (d) { return d3.rgb(d.color).darker(2); })
            // Aggiunge i testi ai nodi
            .append("title")
            .text(function (d) { return d.name + "\n" + "Ci sono " + d.value + " elementi in questo nodo"; });

        // Aggiunge il titolo ai nodi
        node
            .append("text")
            .style("font-size", "0.8em")
            .attr("x", -6)
            .attr("y", function (d) { return d.dy / 2; })
            .attr("dy", ".10em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function (d) { return d.name; })
            .filter(function (d) { return d.x < this.width / 2; })
            .attr("x", 6 + this.sankey.nodeWidth())
            .attr("text-anchor", "start");
        
        // Funzione di movimento dei nodi
        function dragmove(d) {
            d3.select(this)
                .attr("transform",
                    "translate("
                    + d.x + ","
                    + (d.y = Math.max(
                        0, Math.min(height - d.dy, d3.event.y))
                    ) + ")");
                    sankey.relayout();
            link.attr("d", sankey.link());
        }

    };
    
    /**
     * Crea un SVG, un layout del Sankey, i nodi e i link relativo ai dati nel file dati.json
     */
    draw(dataset){
        d3.select('#visualization').html('');
        this.createSvg();
        this.sankey = this.createSankey();
        this.drawNodeLink(dataset, this.color, this.height, this.sankey);
    };

}
