export default class Sankey1 {

    // Variabili
    margin = { top: 10, right: 10, bottom: 10, left: 10 };

    width = 1000 - this.margin.left - this.margin.right;

    height = 600 - this.margin.top - this.margin.bottom;

    nodeWidth = 35;

    nodePadding = 10;

    nodeLayout = 1;

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
        Illuminazione divina
        Reminder per il funzionamento:
            - nel controllo inserire l'index del nodo per facilità di recupero
            - aggiungere altre variabili di conta, che contano gli errori,login e logout da gli orari e dai mesi, per facilitare il value
            - possibilità di portare il parser fuori dalla classe
        */   

        let nodes = [];

        //Variabili controllo presenza per creazione nodi
        let controlloTipologia = [0,0,0];
        let controlloOrario = [0,0];
        let controlloMese = [0,0,0,0,0,0,0,0,0,0,0,0];
        
        //Variabili conteggio per assegnazione value
        let contaLoginOra = [0,0];
        let contaLoginMese = [0,0,0,0,0,0,0,0,0,0,0,0];
        let contaLogoutOra = [0,0];
        let contaLogoutMese = [0,0,0,0,0,0,0,0,0,0,0,0];
        let contaErrorOra = [0,0];
        let contaErrorMese = [0,0,0,0,0,0,0,0,0,0,0,0];

        let orario;
        let index = 1;

        //Creazione nodi seconda colonna
        for (let i = 0; i < dataset.length; i++) {
            switch(dataset[i].tipologia){
                case "login":
                    if(controlloTipologia[0]){
                        nodes.push({"node":index,"name":"login"});
                        index++;
                        controlloTipologia[0]++;
                    }
                    break;
                case "error":
                    if(controlloTipologia[1]){
                        nodes.push({"node":index,"name":"error"});
                        index++;
                        controlloTipologia[1]++;
                    }
                    break;
                case "logout":
                    if(controlloTipologia[2]){
                        nodes.push({"node":index,"name":"logout"});
                        index++;
                        controlloTipologia[2]++;
                    }
                    break;
                default:
                    throw new Error("Tipologia non valida");
            }

            orario = new Date(dataset[i].orario);

            //Creazione nodi prima colonna
            if(orario.getHours() >= 8 && orario.getHours() < 17){
                controlloOrario[0]++;
            }else{
                controlloOrario[1]++;
            }

            //Creazione nodi terza colonna
            switch(orario.getMonth()){
                case 0:
                    if(controlloMese[0]){
                        nodes.push({"node":index,"name":"Gennaio"});
                        index++;
                        controlloTipologia[2]++;
                    }
                    break;
                case 1:
                    controlloMese[1]++;
                    break;
                case 2:
                    controlloMese[2]++;
                    break;
                case 3:
                    controlloMese[3]++;
                    break;
                case 4:
                    controlloMese[4]++;
                    break;
                case 5:
                    controlloMese[5]++;
                    break;
                case 6:
                    controlloMese[6]++;
                    break;
                case 7:
                    controlloMese[7]++;
                    break;
                case 8:
                    controlloMese[8]++;
                    break;
                case 9:
                    controlloMese[9]++;
                    break;
                case 10:
                    controlloMese[10]++;
                    break;
                case 11:
                    controlloMese[11]++;
                    break;
                default:
                    throw new Error("Mese non valido");
            }
        }

        //links
        let links = [];



        return [nodes, links];
    }
    
    
    drawNodeLink(dataset){
        [this.nodes , this.links] = this.parseNode(dataset);
        // Genere un diagramma sankey con i dati in ingresso.
        sankey.nodes(nodes)
            .links(links)
            .layout(nodeLayout);

        // Inserisce i link
        let link = d3.select('svg g')
            .append('g')
            .selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", sankey.link())
            .style("stroke-width", function (d) { return Math.max(1, d.dy); })
            .sort(function (a, b) { return b.dy - a.dy; });

        // Inserisce i nodi
        let node = d3.select('svg g')
            .append('g')
            .selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
            .call(d3.drag()
                .subject(function (d) { return d; })
                .on("start", function () { this.parentNode.appendChild(this); })
                .on("drag", dragmove));

        // Aggiunge i rettangoli ai nodi
        node
            .append("rect")
            .attr("height", function (d) { return d.dy; })
            .attr("width", sankey.nodeWidth())
            .style("fill", function (d) { return d.color = color(d.name.replace(/ .*/, "")); })
            .style("stroke", function (d) { return d3.rgb(d.color).darker(2); })
            // Aggiunge i testi ai nodi
            .append("title")
            .text(function (d) { return d.name + "\n" + "Ci sono " + d.value + " elementi in questo nodo"; });

        // Aggiunge il titolo ai nodi
        node
            .append("text")
            .attr("x", -6)
            .attr("y", function (d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function (d) { return d.name; })
            .filter(function (d) { return d.x < width / 2; })
            .attr("x", 6 + sankey.nodeWidth())
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
        this.drawNodeLink(dataset);
    };

}
