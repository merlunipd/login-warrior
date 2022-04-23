export default class ForceDirectedGraph1 {
    width = 1500;
    height = 800;
    spacing = 100;
    circlesRadius = 5;
    circlesRadiusGrowth = 6;
    circlesOpacity = 0.4;
    simulation;

    createSvg() {
        d3.select('#forceDirectedGraph')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            /*.append('g')
            .attr('transform', `translate(${this.spacing / 2},${this.spacing / 2})`);*/

        this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.id; }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.width / 2, this.height / 2));
    }

    ticked() {
        links
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        nodes
            .attr("cx", function (d) { return d.x = Math.max(this.circlesRadius, Math.min(this.width - this.circlesRadius, d.x)); })
            .attr("cy", function (d) { return d.y = Math.max(this.circlesRadius, Math.min(this.height - this.circlesRadius, d.y)); });
    }

    dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    getLinks() {

    }

    getNodes(dataset) {
        d3.select('svg g').append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(dataset, (d) => d.getId())
            .enter()
            .append("circle")
            .attr("r", 4)
            .style('fill', (d) => {
                switch (d.getEvent()) {
                    case 'login':
                        return 'green';
                    case 'error':
                        return 'red';
                    case 'logout':
                        return 'grey';
                    default:
                        return 'blu';
                }
            })
            /*.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));*/
    }

    startSimulation(dataset) {
        this.simulation.nodes(dataset)
            //.on("tick", ticked);

        this.simulation.force("link")
            //.links(link);
    }


    draw(dataset) {
        d3.select('#visualization').html('');

        this.createSvg();
        this.getLinks();
        this.getNodes(dataset);
        this.startSimulation(dataset);
    }
}