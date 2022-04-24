export default class Sankey1 {

    // Variabili
    margin = { top: 10, right: 10, bottom: 10, left: 10 };

    width = 1000 - this.margin.left - this.margin.right;

    height = 600 - this.margin.top - this.margin.bottom;

    nodeWidth = 35;

    nodePadding = 10;

    nodeLayout = 1;

    sankey;

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

    

    drawNodeLink(dataset){
        // !!! Risolvere il fatto di dover richiamare i dati per farli vedere nella funzione sotto !!!
        let sankey = this.sankey;
        let nodeLayout = this.nodeLayout;
        let color = this.color;
        let height = this.height;
        let width = this.width;
        d3.json("dati.json", function (error, graph) {
            // Genere un diagramma sankey con i dati in ingresso.
            sankey.nodes(graph.nodes)
                .links(graph.links)
                .layout(nodeLayout);

            // Inserisce i link
            let link = d3.select('svg g')
                .append('g')
                .selectAll(".link")
                .data(graph.links)
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
                .data(graph.nodes)
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
                .filter(function (d) { return d.x <width / 2; })
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

        });


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
