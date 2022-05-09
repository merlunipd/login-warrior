export default class Sankey1 {

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
        Reminder per il funzionamento:
            - nelle variabili controllo si inserisce l'index del nodo, per ottenere il nome del nodo e dei target nei link
            - nelle variabili di conta si inserisce la somma delle occorrenze delle entry, per ottenere il value dei link
        */   

        let nodes = [];
        let links = [];

        //Variabili controllo presenza per creazione nodi, undefined se elemento non disponibile, valore dell'index altrimenti
        let controlloTipologia =[]; //1-login, 2-error, 3-logout
        let controlloOrario =[];    //1-orario d'ufficio, 2-orario non d'ufficio
        let controlloMese = new Map();
        
        //Variabili conteggio per assegnazione al value di links
        let contaLoginOra = [0,0];
        let contaLoginMese = new Map();
        let contaLogoutOra = [0,0];
        let contaLogoutMese = new Map();
        let contaErrorOra = [0,0];
        let contaErrorMese = new Map();

        let orario;
        //Array per trasformare il mese numerico in stringa
        let mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
        //indice dei nodi
        let index = 0;

        //Scorre tutti i dati e crea un nodo per ogni tipologia esistente, andando a contare i collegamenti con gli orari e i mesi
        for (let i = 0; i < dataset.length; i++) {
            orario = new Date(dataset[i].getDate());
            let mese = mesi[orario.getMonth()]; //mese in stringa

            //Creazione nodi terza colonna: mesi dell'anno
            if (controlloMese.has(mese) === false) {
                nodes.push({ "node": index, "name": mese });
                controlloMese.set(mese, index);
                contaLoginMese.set(index, 0);
                contaLogoutMese.set(index, 0);
                contaErrorMese.set(index, 0);
                index++;
            }
            let meseIndex = controlloMese.get(mese);
            //Creazione nodi seconda colonna: login, errori, logout
            switch(dataset[i].getEvent()){
                case "login":
                    if( (typeof controlloTipologia[0]) == "undefined"){
                        nodes.push({"node":index,"name":"login"});
                        controlloTipologia[0]=index;
                        index++;
                    }
                    orario.getHours() > 8 && orario.getHours() < 17 ? contaLoginOra[0]++ : contaLoginOra[1]++;
                    contaLoginMese.set(meseIndex, contaLoginMese.get(meseIndex)+1);
                    break;
                case "error":
                    if((typeof controlloTipologia[1]) == "undefined"){
                        nodes.push({"node":index,"name":"error"});
                        controlloTipologia[1]=index;
                        index++;
                    }
                    orario.getHours() > 8 && orario.getHours() < 17 ? contaErrorOra[0]++ : contaErrorOra[1]++;
                    contaErrorMese.set(meseIndex, contaErrorMese.get(meseIndex)+1);
                    break;
                case "logout":
                    if((typeof controlloTipologia[2]) == "undefined"){
                        nodes.push({"node":index,"name":"logout"});
                        controlloTipologia[2]=index;
                        index++;
                    }
                    orario.getHours() > 8 && orario.getHours() < 17 ? contaLogoutOra[0]++ : contaLogoutOra[1]++;
                    contaLogoutMese.set(meseIndex, contaLogoutMese.get(meseIndex)+1);
                    break;
                default:
                    throw new Error("Tipologia non valida");
            }
            //Creazione nodi prima colonna: orario d'ufficio e orario non d'ufficio
            if(orario.getHours() >= 8 && orario.getHours() <= 17 && (typeof controlloOrario[0]) == "undefined"){
                nodes.push({"node":index,"name":"orario d'ufficio"});
                controlloOrario[0]=index;
                index++;
            }else if( (typeof controlloOrario[1]) == "undefined" && ((orario.getHours() >= 0 && orario.getHours() <= 7) || (orario.getHours() >= 18 && orario.getHours() <= 24))){
                nodes.push({"node":index,"name":"orario non d'ufficio"});
                controlloOrario[1]=index;
                index++;
            }else if(orario.getHours() < 0 || orario.getHours() > 24){
                throw new Error("Orario non valido");
            }
        }
        //links

        //link login
        if((typeof controlloTipologia[0]) != "undefined"){
            //link orario d'ufficio
            if((typeof controlloOrario[0]) != "undefined" && contaLoginOra[0]!=0 ){
                links.push({"source":controlloOrario[0],"target":controlloTipologia[0],"value":contaLoginOra[0]});
            }
            //link orario non d'ufficio
            if((typeof controlloOrario[1]) != "undefined" && contaLoginOra[1]!=0 ){
                links.push({"source":controlloOrario[1],"target":controlloTipologia[0],"value":contaLoginOra[1]});
            }
            //link mese
            for (const [key, value] of contaLoginMese) {
                if (value > 0) {
                    links.push({ "source": controlloTipologia[0], "target": key, "value": value });
                }
            }
            
        }
        //link error
        if((typeof controlloTipologia[1]) != "undefined"){
            //link orario d'ufficio
            if((typeof controlloOrario[0]) != "undefined" && contaErrorOra[0]!=0){
                links.push({"source":controlloOrario[0],"target":controlloTipologia[1],"value":contaErrorOra[0]});
            }
            //link orario non d'ufficio
            if((typeof controlloOrario[1]) != "undefined" && contaErrorOra[1]!=0){
                links.push({"source":controlloOrario[1],"target":controlloTipologia[1],"value":contaErrorOra[1]});
            }
            //link mese
            for (const [key, value] of contaErrorMese) {
                if (value > 0) {
                    links.push({ "source": controlloTipologia[1], "target": key, "value": value });
                }
            }
        }
        //link logout
        if((typeof controlloTipologia[2]) != "undefined"){
            //link orario d'ufficio
            if((typeof controlloOrario[0]) != "undefined" && contaLogoutOra[0]!=0){
                links.push({"source":controlloOrario[0],"target":controlloTipologia[2],"value":contaLogoutOra[0]});
            }
            //link orario non d'ufficio    
            if((typeof controlloOrario[1]) != "undefined" && contaLogoutOra[1]!=0){
                links.push({"source":controlloOrario[1],"target":controlloTipologia[2],"value":contaLogoutOra[1]});
            }
            //link mese
            for (const [key, value] of contaLogoutMese) {
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
