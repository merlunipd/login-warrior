export default class ForceDirectedGraph1 {
    width = 1300;
    height = 600;
    spacing = 100;
    circlesRadius = 6;
    circlesRadiusGrowth = 8;
    circlesOpacity = 0.4;
    force;
    cat;
    nodes;
    links;
    svg;

    createSvg() {
        this.svg = d3.select('#visualization')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
    }

    createForce() {
        return d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.id; }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.width / 3, this.height / 2))
    }


    parseDati(dataset) {
        let nodes = [];
        let links = [];

        let id;
        let e;
        let log = 0;
        let err = 0;
        let ratio;
        let b = false;

        // nodes
        nodes.push({ "id": "p100", "fPerc": 90, "sPerc": 100 });
        nodes.push({ "id": "p80", "fPerc": 70, "sPerc": 90 });
        nodes.push({ "id": "p60", "fPerc": 50, "sPerc": 70 });
        nodes.push({ "id": "p40", "fPerc": 30, "sPerc": 50 });
        nodes.push({ "id": "p20", "fPerc": 10, "sPerc": 30 });
        nodes.push({ "id": "p0", "fPerc": 0, "sPerc": 10 });

        for (let i = 0; i < dataset.length; i++) {
            id = dataset[i].getId();
            e = dataset[i].getEvent();
            for (let j = 6; j < nodes.length; j++) {
                if (id == nodes[j].id) {
                    b = true;
                    if (e === "login") {
                        nodes[j].login++;
                    } else if (e === "error") {
                        nodes[j].error++;
                    }
                    nodes[j].ratio = nodes[j].error ? nodes[j].login / (nodes[j].login + nodes[j].error) * 100 : 100;
                }
            }
            if (!b) {
                log = 0; err = 0;
                if (e === "login") {
                    log++;
                } else if (e === "error") {
                    err++;
                }
                ratio = err ? 0 : 100;
                nodes.push({ "id": id, "login": log, "error": err, "ratio": ratio });
            }
            b = false;
        }


        // links
        let r1;
        for (let i = 0; i < nodes.length; i++) {
            if (i < 5) {
                links.push({ "source": nodes[i].id, "target": nodes[i + 1].id, "value": 5});
            } else {
                r1 = nodes[i].ratio;
                if (r1 >= 90) {
                    links.push({ "source": nodes[i].id, "target": nodes[0].id, "value": 2});
                } else if (r1 >= 70 && r1 < 90) {
                    links.push({ "source": nodes[i].id, "target": nodes[1].id, "value": 2});
                } else if (r1 >= 50 && r1 < 70) {
                    links.push({ "source": nodes[i].id, "target": nodes[2].id, "value": 2});
                } else if (r1 >= 30 && r1 < 50) {
                    links.push({ "source": nodes[i].id, "target": nodes[3].id, "value": 2});
                } else if (r1 >= 10 && r1 < 30) {
                    links.push({ "source": nodes[i].id, "target": nodes[4].id, "value": 2});
                } else {
                    links.push({ "source": nodes[i].id, "target": nodes[5].id, "value": 2});
                }
            }
        }

        return [nodes, links];
    }


    getNodesLinks(dataset, width, height, circlesRadius, circlesRadiusGrowth, force) {
        [this.nodes, this.links] = this.parseDati(dataset);

        var links2 = this.svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.links)
            .enter()
            .append("line")
            .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

        var nodes2 = this.svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.nodes, (d) => d.id)
            .enter()
            .append("circle")
            .attr("r", circlesRadius)
            .on('mouseover', mouseover)
            .on('mouseout', mouseout)
            .style('fill', (d) => {
                if (d.ratio >= 90) {
                    return "limegreen";
                } else if (d.ratio >= 70 && d.ratio < 90) {
                    return "green";
                } else if (d.ratio >= 50 && d.ratio < 70) {
                    return "olive";
                } else if (d.ratio >= 30 && d.ratio < 50) {
                    return "coral";
                } else if (d.ratio >= 10 && d.ratio < 30) {
                    return "orange";
                } else if (d.ratio < 10){
                    return "red";
                } else {
                    return "black";
                }
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        nodes2.append('title')
            .text((d) => d.id.substring(0, 1) === "p" ? `Percentuale Successi: ${d.fPerc}% - ${d.sPerc}%` : `ID: ${d.id}\nLOGIN: ${d.login}\nERRORI: ${d.error}\nSUCCESSI: ${d.ratio.toFixed(1)}%`);


        this.force.nodes(this.nodes)
            .on("tick", ticked);

        this.force.force("link")
            .links(this.links);


        function ticked() {
            links2
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            nodes2
                .attr("cx", function (d) { return d.x = Math.max(circlesRadius, Math.min(width - circlesRadius, d.x)); })
                .attr("cy", function (d) { return d.y = Math.max(circlesRadius, Math.min(height - circlesRadius, d.y)); });
        }

        function dragstarted(d) {
            if (!d3.event.active) force.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) force.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }


        function mouseover() {
            d3.select(this)
                .attr("r", circlesRadius + circlesRadiusGrowth)
                .style('opacity', 1)
                .style('stroke', 'black');
        }

        function mouseout() {
            d3.select(this)
                .attr("r", circlesRadius)
                .style('opacity', this.circlesOpacity)
                .style('stroke', 'none');
        }
    }

    draw(dataset) {
        d3.select('#visualization').html('');

        this.createSvg();
        this.force = this.createForce();

        this.getNodesLinks(dataset, this.width, this.height, this.circlesRadius, this.circlesRadiusGrowth, this.force);
    }
}