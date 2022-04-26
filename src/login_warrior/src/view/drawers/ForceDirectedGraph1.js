export default class ForceDirectedGraph1 {
    width = 1500;
    height = 800;
    spacing = 100;
    circlesRadius = 5;
    circlesRadiusGrowth = 6;
    circlesOpacity = 0.4;
    simulation;
    links;
    nodes;

    createSvg() {
        d3.select('#visualization')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', `translate(${this.spacing / 2},${this.spacing / 2})`);

        /*this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.getId(); }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.width / 2, this.height / 2));*/


    }

    newSimulation(dataset) {
        this.simulation = d3.forceSimulation(dataset)
            .force("link", d3.forceLink().id(function (d) { return d.getId(); }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter())
            //.on("tick", this.ticked);
    }

    getLinks() {
        var link = [
            { "source": 1, "target": 0, "value": 1 },
            { "source": 2, "target": 0, "value": 8 },
            { "source": 3, "target": 0, "value": 10 },
            { "source": 3, "target": 2, "value": 6 },
            { "source": 4, "target": 0, "value": 1 },
            { "source": 5, "target": 0, "value": 1 },
            { "source": 6, "target": 0, "value": 1 },
            { "source": 7, "target": 0, "value": 1 },
            { "source": 8, "target": 0, "value": 2 },
            { "source": 9, "target": 0, "value": 1 },
            { "source": 11, "target": 10, "value": 1 },
            { "source": 11, "target": 3, "value": 3 },
            { "source": 11, "target": 2, "value": 3 },
            { "source": 11, "target": 0, "value": 5 },
            { "source": 12, "target": 11, "value": 1 },
            { "source": 13, "target": 11, "value": 1 },
            { "source": 14, "target": 11, "value": 1 },
            { "source": 15, "target": 11, "value": 1 },
            { "source": 17, "target": 16, "value": 4 },
            { "source": 18, "target": 16, "value": 4 },
            { "source": 18, "target": 17, "value": 4 },
            { "source": 19, "target": 16, "value": 4 },
            { "source": 19, "target": 17, "value": 4 },
            { "source": 19, "target": 18, "value": 4 },
            { "source": 20, "target": 16, "value": 3 },
            { "source": 20, "target": 17, "value": 3 },
            { "source": 20, "target": 18, "value": 3 },
            { "source": 20, "target": 19, "value": 4 },
            { "source": 21, "target": 16, "value": 3 },
            { "source": 21, "target": 17, "value": 3 },
            { "source": 21, "target": 18, "value": 3 },
            { "source": 21, "target": 19, "value": 3 },
            { "source": 21, "target": 20, "value": 5 },
            { "source": 22, "target": 16, "value": 3 },
            { "source": 22, "target": 17, "value": 3 },
            { "source": 22, "target": 18, "value": 3 },
            { "source": 22, "target": 19, "value": 3 },
            { "source": 22, "target": 20, "value": 4 },
            { "source": 22, "target": 21, "value": 4 },
            { "source": 23, "target": 16, "value": 3 },
            { "source": 23, "target": 17, "value": 3 },
            { "source": 23, "target": 18, "value": 3 },
            { "source": 23, "target": 19, "value": 3 },
            { "source": 23, "target": 20, "value": 4 },
            { "source": 23, "target": 21, "value": 4 },
            { "source": 23, "target": 22, "value": 4 },
            { "source": 23, "target": 12, "value": 2 },
            { "source": 23, "target": 11, "value": 9 },
            { "source": 24, "target": 23, "value": 2 },
            { "source": 24, "target": 11, "value": 7 },
            { "source": 25, "target": 24, "value": 13 },
            { "source": 25, "target": 23, "value": 1 },
            { "source": 25, "target": 11, "value": 12 },
            { "source": 26, "target": 24, "value": 4 },
            { "source": 26, "target": 11, "value": 31 },
            { "source": 26, "target": 16, "value": 1 },
            { "source": 26, "target": 25, "value": 1 },
            { "source": 27, "target": 11, "value": 17 },
            { "source": 27, "target": 23, "value": 5 },
            { "source": 27, "target": 25, "value": 5 },
            { "source": 27, "target": 24, "value": 1 },
            { "source": 27, "target": 26, "value": 1 },
            { "source": 28, "target": 11, "value": 8 },
            { "source": 28, "target": 27, "value": 1 },
            { "source": 29, "target": 23, "value": 1 },
            { "source": 29, "target": 27, "value": 1 },
            { "source": 29, "target": 11, "value": 2 },
            { "source": 30, "target": 23, "value": 1 },
            { "source": 31, "target": 30, "value": 2 },
            { "source": 31, "target": 11, "value": 3 },
            { "source": 31, "target": 23, "value": 2 },
            { "source": 31, "target": 27, "value": 1 },
            { "source": 32, "target": 11, "value": 1 },
            { "source": 33, "target": 11, "value": 2 },
            { "source": 33, "target": 27, "value": 1 },
            { "source": 34, "target": 11, "value": 3 },
            { "source": 34, "target": 29, "value": 2 },
            { "source": 35, "target": 11, "value": 3 },
            { "source": 35, "target": 34, "value": 3 },
            { "source": 35, "target": 29, "value": 2 },
            { "source": 36, "target": 34, "value": 2 },
            { "source": 36, "target": 35, "value": 2 },
            { "source": 36, "target": 11, "value": 2 },
            { "source": 36, "target": 29, "value": 1 },
            { "source": 37, "target": 34, "value": 2 },
            { "source": 37, "target": 35, "value": 2 },
            { "source": 37, "target": 36, "value": 2 },
            { "source": 37, "target": 11, "value": 2 },
            { "source": 37, "target": 29, "value": 1 },
            { "source": 38, "target": 34, "value": 2 },
            { "source": 38, "target": 35, "value": 2 },
            { "source": 38, "target": 36, "value": 2 },
            { "source": 38, "target": 37, "value": 2 },
            { "source": 38, "target": 11, "value": 2 },
            { "source": 38, "target": 29, "value": 1 },
            { "source": 39, "target": 25, "value": 1 },
            { "source": 40, "target": 25, "value": 1 },
            { "source": 41, "target": 24, "value": 2 },
            { "source": 41, "target": 25, "value": 3 },
            { "source": 42, "target": 41, "value": 2 },
            { "source": 42, "target": 25, "value": 2 },
            { "source": 42, "target": 24, "value": 1 },
            { "source": 43, "target": 11, "value": 3 },
            { "source": 43, "target": 26, "value": 1 },
            { "source": 43, "target": 27, "value": 1 },
            { "source": 44, "target": 28, "value": 3 },
            { "source": 44, "target": 11, "value": 1 },
            { "source": 45, "target": 28, "value": 2 },
            { "source": 47, "target": 46, "value": 1 },
            { "source": 48, "target": 47, "value": 2 },
            { "source": 48, "target": 25, "value": 1 },
            { "source": 48, "target": 27, "value": 1 },
            { "source": 48, "target": 11, "value": 1 },
            { "source": 49, "target": 26, "value": 3 },
            { "source": 49, "target": 11, "value": 2 },
            { "source": 50, "target": 49, "value": 1 },
            { "source": 50, "target": 24, "value": 1 },
            { "source": 51, "target": 49, "value": 9 },
            { "source": 51, "target": 26, "value": 2 },
            { "source": 51, "target": 11, "value": 2 },
            { "source": 52, "target": 51, "value": 1 },
            { "source": 52, "target": 39, "value": 1 },
            { "source": 53, "target": 51, "value": 1 },
            { "source": 54, "target": 51, "value": 2 },
            { "source": 54, "target": 49, "value": 1 },
            { "source": 54, "target": 26, "value": 1 },
            { "source": 55, "target": 51, "value": 6 },
            { "source": 55, "target": 49, "value": 12 },
            { "source": 55, "target": 39, "value": 1 },
            { "source": 55, "target": 54, "value": 1 },
            { "source": 55, "target": 26, "value": 21 },
            { "source": 55, "target": 11, "value": 19 },
            { "source": 55, "target": 16, "value": 1 },
            { "source": 55, "target": 25, "value": 2 },
            { "source": 55, "target": 41, "value": 5 },
            { "source": 55, "target": 48, "value": 4 },
            { "source": 56, "target": 49, "value": 1 },
            { "source": 56, "target": 55, "value": 1 },
            { "source": 57, "target": 55, "value": 1 },
            { "source": 57, "target": 41, "value": 1 },
            { "source": 57, "target": 48, "value": 1 },
            { "source": 58, "target": 55, "value": 7 },
            { "source": 58, "target": 48, "value": 7 },
            { "source": 58, "target": 27, "value": 6 },
            { "source": 58, "target": 57, "value": 1 },
            { "source": 58, "target": 11, "value": 4 },
            { "source": 59, "target": 58, "value": 15 },
            { "source": 59, "target": 55, "value": 5 },
            { "source": 59, "target": 48, "value": 6 },
            { "source": 59, "target": 57, "value": 2 },
            { "source": 60, "target": 48, "value": 1 },
            { "source": 60, "target": 58, "value": 4 },
            { "source": 60, "target": 59, "value": 2 },
            { "source": 61, "target": 48, "value": 2 },
            { "source": 61, "target": 58, "value": 6 },
            { "source": 61, "target": 60, "value": 2 },
            { "source": 61, "target": 59, "value": 5 },
            { "source": 61, "target": 57, "value": 1 },
            { "source": 61, "target": 55, "value": 1 },
            { "source": 62, "target": 55, "value": 9 },
            { "source": 62, "target": 58, "value": 17 },
            { "source": 62, "target": 59, "value": 13 },
            { "source": 62, "target": 48, "value": 7 },
            { "source": 62, "target": 57, "value": 2 },
            { "source": 62, "target": 41, "value": 1 },
            { "source": 62, "target": 61, "value": 6 },
            { "source": 62, "target": 60, "value": 3 },
            { "source": 63, "target": 59, "value": 5 },
            { "source": 63, "target": 48, "value": 5 },
            { "source": 63, "target": 62, "value": 6 },
            { "source": 63, "target": 57, "value": 2 },
            { "source": 63, "target": 58, "value": 4 },
            { "source": 63, "target": 61, "value": 3 },
            { "source": 63, "target": 60, "value": 2 },
            { "source": 63, "target": 55, "value": 1 },
            { "source": 64, "target": 55, "value": 5 },
            { "source": 64, "target": 62, "value": 12 },
            { "source": 64, "target": 48, "value": 5 },
            { "source": 64, "target": 63, "value": 4 },
            { "source": 64, "target": 58, "value": 10 },
            { "source": 64, "target": 61, "value": 6 },
            { "source": 64, "target": 60, "value": 2 },
            { "source": 64, "target": 59, "value": 9 },
            { "source": 64, "target": 57, "value": 1 },
            { "source": 64, "target": 11, "value": 1 },
            { "source": 65, "target": 63, "value": 5 },
            { "source": 65, "target": 64, "value": 7 },
            { "source": 65, "target": 48, "value": 3 },
            { "source": 65, "target": 62, "value": 5 },
            { "source": 65, "target": 58, "value": 5 },
            { "source": 65, "target": 61, "value": 5 },
            { "source": 65, "target": 60, "value": 2 },
            { "source": 65, "target": 59, "value": 5 },
            { "source": 65, "target": 57, "value": 1 },
            { "source": 65, "target": 55, "value": 2 },
            { "source": 66, "target": 64, "value": 3 },
            { "source": 66, "target": 58, "value": 3 },
            { "source": 66, "target": 59, "value": 1 },
            { "source": 66, "target": 62, "value": 2 },
            { "source": 66, "target": 65, "value": 2 },
            { "source": 66, "target": 48, "value": 1 },
            { "source": 66, "target": 63, "value": 1 },
            { "source": 66, "target": 61, "value": 1 },
            { "source": 66, "target": 60, "value": 1 },
            { "source": 67, "target": 57, "value": 3 },
            { "source": 68, "target": 25, "value": 5 },
            { "source": 68, "target": 11, "value": 1 },
            { "source": 68, "target": 24, "value": 1 },
            { "source": 68, "target": 27, "value": 1 },
            { "source": 68, "target": 48, "value": 1 },
            { "source": 68, "target": 41, "value": 1 },
            { "source": 69, "target": 25, "value": 6 },
            { "source": 69, "target": 68, "value": 6 },
            { "source": 69, "target": 11, "value": 1 },
            { "source": 69, "target": 24, "value": 1 },
            { "source": 69, "target": 27, "value": 2 },
            { "source": 69, "target": 48, "value": 1 },
            { "source": 69, "target": 41, "value": 1 },
            { "source": 70, "target": 25, "value": 4 },
            { "source": 70, "target": 69, "value": 4 },
            { "source": 70, "target": 68, "value": 4 },
            { "source": 70, "target": 11, "value": 1 },
            { "source": 70, "target": 24, "value": 1 },
            { "source": 70, "target": 27, "value": 1 },
            { "source": 70, "target": 41, "value": 1 },
            { "source": 70, "target": 58, "value": 1 },
            { "source": 71, "target": 27, "value": 1 },
            { "source": 71, "target": 69, "value": 2 },
            { "source": 71, "target": 68, "value": 2 },
            { "source": 71, "target": 70, "value": 2 },
            { "source": 71, "target": 11, "value": 1 },
            { "source": 71, "target": 48, "value": 1 },
            { "source": 71, "target": 41, "value": 1 },
            { "source": 71, "target": 25, "value": 1 },
            { "source": 72, "target": 26, "value": 2 },
            { "source": 72, "target": 27, "value": 1 },
            { "source": 72, "target": 11, "value": 1 },
            { "source": 73, "target": 48, "value": 2 },
            { "source": 74, "target": 48, "value": 2 },
            { "source": 74, "target": 73, "value": 3 },
            { "source": 75, "target": 69, "value": 3 },
            { "source": 75, "target": 68, "value": 3 },
            { "source": 75, "target": 25, "value": 3 },
            { "source": 75, "target": 48, "value": 1 },
            { "source": 75, "target": 41, "value": 1 },
            { "source": 75, "target": 70, "value": 1 },
            { "source": 75, "target": 71, "value": 1 },
            { "source": 76, "target": 64, "value": 1 },
            { "source": 76, "target": 65, "value": 1 },
            { "source": 76, "target": 66, "value": 1 },
            { "source": 76, "target": 63, "value": 1 },
            { "source": 76, "target": 62, "value": 1 },
            { "source": 76, "target": 48, "value": 1 },
            { "source": 76, "target": 58, "value": 1 },
            { "source": 77, "target": 69, "value": 3 },
            { "source": 77, "target": 68, "value": 3 },
            { "source": 77, "target": 25, "value": 3 },
            { "source": 77, "target": 48, "value": 1 },
            { "source": 78, "target": 41, "value": 1 },
            { "source": 79, "target": 70, "value": 1 },
            { "source": 80, "target": 71, "value": 1 },
            { "source": 81, "target": 64, "value": 1 },
            { "source": 76, "target": 65, "value": 1 },
            { "source": 82, "target": 66, "value": 1 },
            { "source": 83, "target": 63, "value": 1 },
            { "source": 84, "target": 62, "value": 1 },
            { "source": 85, "target": 48, "value": 1 },
            { "source": 86, "target": 69, "value": 3 },
            { "source": 86, "target": 68, "value": 3 },
            { "source": 87, "target": 25, "value": 3 },
            { "source": 88, "target": 48, "value": 1 },
            { "source": 89, "target": 41, "value": 1 },
            { "source": 90, "target": 70, "value": 1 },
            { "source": 91, "target": 71, "value": 1 },
            { "source": 92, "target": 64, "value": 1 },
            { "source": 93, "target": 65, "value": 1 },
            { "source": 94, "target": 66, "value": 1 },
            { "source": 95, "target": 63, "value": 1 },
            { "source": 96, "target": 62, "value": 1 },
            { "source": 97, "target": 48, "value": 1 },
            { "source": 98, "target": 55, "value": 1 },
            { "source": 99, "target": 55, "value": 1 },
            { "source": 100, "target": 41, "value": 1 },
            { "source": 101, "target": 48, "value": 1 },
            { "source": 102, "target": 55, "value": 7 },
            { "source": 103, "target": 48, "value": 7 },
            { "source": 104, "target": 27, "value": 6 },
            { "source": 105, "target": 57, "value": 1 },
            { "source": 106, "target": 11, "value": 4 },
            { "source": 107, "target": 58, "value": 15 },
            { "source": 108, "target": 55, "value": 5 },
            { "source": 109, "target": 48, "value": 6 },
            { "source": 110, "target": 57, "value": 2 },
            { "source": 111, "target": 48, "value": 1 },
            { "source": 112, "target": 58, "value": 4 },
            { "source": 113, "target": 59, "value": 2 },
            { "source": 114, "target": 48, "value": 2 },
            { "source": 115, "target": 58, "value": 6 },
            { "source": 116, "target": 60, "value": 2 },
            { "source": 117, "target": 59, "value": 5 },
            { "source": 118, "target": 57, "value": 1 },
            { "source": 119, "target": 55, "value": 1 }
        ];

        this.links = d3.select('svg g').append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(link)
            .enter()
            .append("line")
            .attr("stroke-width", function (d) { return Math.sqrt(d.value); });
    }

    getNodes(dataset) {
        this.nodes = d3.select('svg g').append("g")
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
            .call(d3.drag()
                .on("start", this.dragstarted)
                .on("drag", this.dragged)
                .on("end", this.dragended));
            /*.call(drag(simulation));*/
    }

    startSimulation(dataset) {
        this.simulation.nodes(dataset)
            .on("tick", this.ticked);

        this.simulation.force("link")
            .links(this.links);
    }

    
    ticked() {
        this.links
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        this.nodes
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


    /*drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }*/


    draw(dataset) {
        d3.select('#visualization').html('');

        this.createSvg();
        this.newSimulation(dataset);
        this.getLinks();
        this.getNodes(dataset);

        //console.log(this.nodes);
        //console.log(this.links);

        this.startSimulation(dataset);
    }
}