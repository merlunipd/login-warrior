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
        Illuminazione divina (da rifare con map al posto di array!)
        Reminder per il funzionamento:
            - nel controllo inserire l'index del nodo per facilità di recupero nella creazione dei link
            - aggiungere altre variabili di conta, che contano gli errori,login e logout degli orari e dei mesi, per facilitare il value dei link
            - possibilità di portare il parser fuori dalla classe!
        */   

        let nodes = [];
        let links = [];

        //Variabili controllo presenza per creazione nodi, undefined se elemento non disponibile, valore dell'index altrimenti
        let controlloTipologia =[]; //1-login, 2-error, 3-logout
        let controlloOrario =[];    //1-orario d'ufficio, 2-orario non d'ufficio
        let controlloMese =[];  //indice = numero del mese - 1
        
        //Variabili conteggio per assegnazione al value di links
        let contaLoginOra = [0,0];
        let contaLoginMese = [0,0,0,0,0,0,0,0,0,0,0,0];
        let contaLogoutOra = [0,0];
        let contaLogoutMese = [0,0,0,0,0,0,0,0,0,0,0,0];
        let contaErrorOra = [0,0];
        let contaErrorMese = [0,0,0,0,0,0,0,0,0,0,0,0];

        let orario;
        //indice dei nodi
        let index = 0;

        

        
        //Scorre tutti i dati e crea un nodo per ogni tipologia esistente, andando a contare i collegamenti con gli orari e i mesi
        for (let i = 0; i < dataset.length; i++) {
            orario = new Date(dataset[i].getDate());

            //Creazione nodi seconda colonna, login, errori, logout
            switch(dataset[i].getEvent()){
                case "login":
                    if( (typeof controlloTipologia[0]) == "undefined"){
                        nodes.push({"node":index,"name":"login"});
                        controlloTipologia[0]=index;
                        index++;
                    }
                    orario.getHours() > 8 && orario.getHours() < 17 ? contaLoginOra[0]++ : contaLoginOra[1]++;
                    contaLoginMese[orario.getMonth()]++;
                    break;
                case "error":
                    if((typeof controlloTipologia[1]) == "undefined"){
                        nodes.push({"node":index,"name":"error"});
                        controlloTipologia[1]=index;
                        index++;
                    }
                    orario.getHours() > 8 && orario.getHours() < 17 ? contaErrorOra[0]++ : contaErrorOra[1]++;
                    contaErrorMese[orario.getMonth()]++;
                    break;
                case "logout":
                    if((typeof controlloTipologia[2]) == "undefined"){
                        nodes.push({"node":index,"name":"logout"});
                        controlloTipologia[2]=index;
                        index++;
                    }
                    orario.getHours() > 8 && orario.getHours() < 17 ? contaLogoutOra[0]++ : contaLogoutOra[1]++;
                    contaLogoutMese[orario.getMonth()]++;
                    break;
                default:
                    throw new Error("Tipologia non valida");
            }

            

            //Creazione nodi prima colonna, orario d'ufficio e orario non d'ufficio
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

            //Creazione nodi terza colonna, mesi dell'anno
            switch(orario.getMonth()){
                case 0:
                    if((typeof controlloMese[0]) == "undefined"){
                        nodes.push({"node":index,"name":"Gennaio"});
                        controlloMese[0]=index;
                        index++;
                    }
                    break;
                case 1:
                    if((typeof controlloMese[1]) == "undefined"){
                        nodes.push({"node":index,"name":"Febbraio"});
                        controlloMese[1]=index;
                        index++;
                    }
                    break;
                case 2:
                    if((typeof controlloMese[2]) == "undefined"){
                        nodes.push({"node":index,"name":"Marzo"});
                        controlloMese[2]=index;
                        index++;
                    }
                    break;
                case 3:
                    if((typeof controlloMese[3]) == "undefined"){
                        nodes.push({"node":index,"name":"Aprile"});
                        controlloMese[3]=index;
                        index++;
                    }
                    break;
                case 4:
                    if((typeof controlloMese[4]) == "undefined"){
                        nodes.push({"node":index,"name":"Maggio"});
                        controlloMese[4]=index;
                        index++;
                    }
                    break;
                case 5:
                    if((typeof controlloMese[5]) == "undefined"){
                        nodes.push({"node":index,"name":"Giugno"});
                        controlloMese[5]=index;
                        index++;
                    }
                    break;
                case 6:
                    if((typeof controlloMese[6]) == "undefined"){
                        nodes.push({"node":index,"name":"Luglio"});
                        controlloMese[6]=index;
                        index++;
                    }
                    break;
                case 7:
                    if((typeof controlloMese[7]) == "undefined"){
                        nodes.push({"node":index,"name":"Agosto"});
                        controlloMese[7]=index;
                        index++;
                    }
                    break;
                case 8:
                    if((typeof controlloMese[8]) == "undefined"){
                        nodes.push({"node":index,"name":"Settembre"});
                        controlloMese[8]=index;
                        index++;
                    }
                    break;
                case 9:
                    if((typeof controlloMese[9]) == "undefined"){
                        nodes.push({"node":index,"name":"Ottobre"});
                        controlloMese[9]=index;
                        index++;
                    }
                    break;
                case 10:
                    if((typeof controlloMese[10]) == "undefined"){
                        nodes.push({"node":index,"name":"Novembre"});
                        controlloMese[10]=index;
                        index++;
                    }
                    break;
                case 11:
                    if((typeof controlloMese[11]) == "undefined"){
                        nodes.push({"node":index,"name":"Dicembre"});
                        controlloMese[11]=index;
                        index++;
                    }
                    break;
                default:
                    throw new Error("Mese non valido");
            }
        }
        //links
        
        if((typeof controlloTipologia[0]) != "undefined"){
            if((typeof controlloOrario[0]) != "undefined" && contaLoginOra[0]!=0 ){
                links.push({"source":controlloOrario[0],"target":controlloTipologia[0],"value":contaLoginOra[0]});
            }
            
            if((typeof controlloOrario[1]) != "undefined" && contaLoginOra[1]!=0 ){
                let s = controlloOrario[1];
                let t = controlloTipologia[0];
                let v = contaLoginOra[1];
                links.push({"source":s,"target":t,"value":v});
            }
            for(let i=0;i<=controlloMese.length;i++){
                if((typeof controlloMese[i]) != "undefined" && contaLoginMese[i]!=0){
                    links.push({"source":controlloTipologia[0],"target":controlloMese[i],"value":contaLoginMese[i]});
                }
            }
            
            
        }
        
        if((typeof controlloTipologia[1]) != "undefined"){
            if((typeof controlloOrario[0]) != "undefined" && contaErrorOra[0]!=0){
                links.push({"source":controlloOrario[0],"target":controlloTipologia[1],"value":contaErrorOra[0]});
            }
            if((typeof controlloOrario[1]) != "undefined" && contaErrorOra[1]!=0){
                links.push({"source":controlloOrario[1],"target":controlloTipologia[1],"value":contaErrorOra[1]});
            }
            for(let i=0;i<=controlloMese.length;i++){
                if((typeof controlloMese[i]) != "undefined" && contaErrorMese[i]!=0){
                    links.push({"source":controlloTipologia[1],"target":controlloMese[i],"value":contaErrorMese[i]});
                }
            }
        }
        if((typeof controlloTipologia[2]) != "undefined"){
            if((typeof controlloOrario[0]) != "undefined" && contaLogoutOra[0]!=0){
                links.push({"source":controlloOrario[0],"target":controlloTipologia[2],"value":contaLogoutOra[0]});
            }
            if((typeof controlloOrario[1]) != "undefined" && contaLogoutOra[1]!=0){
                links.push({"source":controlloOrario[1],"target":controlloTipologia[2],"value":contaLogoutOra[1]});
            }
            for(let i=0;i<=controlloMese.length;i++){
                if((typeof controlloMese[i]) != "undefined" && contaLogoutMese[i]!=0){
                    links.push({"source":controlloTipologia[2],"target":controlloMese[i],"value":contaLogoutMese[i]});
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
