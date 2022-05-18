export default class ForceDirectedGraph1 {
    width = 1000;
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
        //.attr('transform', `translate(${this.spacing / 2},${this.spacing / 2})`);
    }

    createForce() {
        return d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.id; }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))
    }


    parseDati(dataset) {
        /*
        Illuminazione divina (da rifare con map al posto di array!)
        Reminder per il funzionamento:
            - nel controllo inserire l'index del nodo per facilità di recupero nella creazione dei link
            - aggiungere altre variabili di conta, che contano gli errori,login e logout degli orari e dei mesi, per facilitare il value dei link
            - possibilità di portare il parser fuori dalla classe!
        */

        let nodes = [];
        let links = [];


        let id;
        let e;
        let log = 0;
        let err = 0;
        let ratio;
        let b = false;

        nodes.push({ "id": "p100", "fPerc": 90, "sPerc": 100 });
        nodes.push({ "id": "p80", "fPerc": 70, "sPerc": 90 });
        nodes.push({ "id": "p60", "fPerc": 50, "sPerc": 70 });
        nodes.push({ "id": "p40", "fPerc": 30, "sPerc": 50 });
        nodes.push({ "id": "p20", "fPerc": 10, "sPerc": 30 });
        nodes.push({ "id": "p0", "fPerc": 0, "sPerc": 10 });

        //console.log(dataset.length);
        //console.log(dataset);
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

        //console.log(nodes.length);
        //console.log(nodes);


        //links

        let r1;

        //console.log(typeof(dataset[0].getId()));
        //console.log(typeof(nodes[0].id));

        for (let i = 0; i < nodes.length; i++) {
            if (i < 5) {
                links.push({ "source": nodes[i].id, "target": nodes[i + 1].id, "value": 10});
            } else {
                r1 = nodes[i].ratio;
                if (r1 >= 90) {
                    links.push({ "source": nodes[i].id, "target": nodes[0].id, "value": 5/*, "distance": 1 */ });
                } else if (r1 >= 70 && r1 < 90) {
                    links.push({ "source": nodes[i].id, "target": nodes[1].id, "value": 5/*, "distance": 1 */ });
                } else if (r1 >= 50 && r1 < 70) {
                    links.push({ "source": nodes[i].id, "target": nodes[2].id, "value": 5/*, "distance": 1 */ });
                } else if (r1 >= 30 && r1 < 50) {
                    links.push({ "source": nodes[i].id, "target": nodes[3].id, "value": 5/*, "distance": 1 */ });
                } else if (r1 >= 10 && r1 < 30) {
                    links.push({ "source": nodes[i].id, "target": nodes[4].id, "value": 5/*, "distance": 1 */ });
                } else {
                    links.push({ "source": nodes[i].id, "target": nodes[5].id, "value": 5/*, "distance": 1 */ });
                }
            }
        }



        /*for (let i = 0; i < nodes.length; i++) {
            r1 = nodes[i].ratio;
            for (let j = i + 1; j < nodes.length && count < 15; j++) {
                r2 = nodes[j].ratio;

                if (r1 == r2) {
                    count++;
                    links.push({ "source": nodes[i].id, "target": nodes[j].id, "value": 5, "distance": 1 });
                } else if (Math.abs(r1 - r2) < 5) {
                    count++;
                links.push({ "source": nodes[i].id, "target": nodes[j].id, "value": 4, "distance": 10 });
                } else if (Math.abs(r1 - r2) < 20) {
                    count++;
                links.push({ "source": nodes[i].id, "target": nodes[j].id, "value": 3, "distance": 1000 });
                } else if (Math.abs(r1 - r2) < 50) {
                    count++;
                links.push({ "source": nodes[i].id, "target": nodes[j].id, "value": 2, "distance": 1500 });
                } else if (Math.abs(r1 - r2) < 70) {
                    count++;
                links.push({ "source": nodes[i].id, "target": nodes[j].id, "value": 1, "distance": 10000 });
                }



                /*if (c) {
                    if (r1 > 50 && r2 > 50 /*&& Math.floor(nodes[i].login/10) == Math.floor(nodes[j].login/10)*///) {
        /*count++;
        links.push({ "source": nodes[i].id, "target": nodes[j].id, "value": 5 - Math.abs(r1 - r2) });
    } else if (r1 < 50 && r2 < 50 /*&& Math.floor(nodes[i].error/10) == Math.floor(nodes[j].error/10)*///) {
        /*count++;
        links.push({ "source": nodes[i].id, "target": nodes[j].id, "value": 5 - Math.abs(r1 - r2) });
    }
}*/


        /*if (Math.abs(r1-r2) < 2 && Math.floor(nodes[i].login/5) == Math.floor(nodes[j].login/10)) {
            count++;
            links.push({"source":nodes[i].id,"target":nodes[j].id,"value":5-Math.abs(r1-r2)});
        }*/
        /*}
        count = 0;
    }*/


        return [nodes, links];
    }


    getNodesLinks(dataset, width, height, circlesRadius, circlesRadiusGrowth, force) {
        [this.nodes, this.links] = this.parseDati(dataset);

        console.log(this.nodes.length);
        console.log(this.nodes);
        console.log(this.links);
        console.log(this.cat);


        //console.log(this.svg);

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
            /*.on('mouseover', (e) => this.mouseover(e))
            .on('mouseout', (e) => this.mouseout(e))*/
            .style('fill', (d) => {
                if (d.ratio >= 80) {
                    return "rgb(0, " + d.ratio * 255 / 100 + ", 0)";
                } else if (d.ratio >= 60 && d.ratio < 80) {
                    return "rgb(" + (204 - d.ratio * 255 / 100) + ", " + d.ratio * 255 / 100 + ", 0)";
                } else if (d.ratio >= 40 && d.ratio < 60) {
                    return "rgb(" + (255 - d.ratio * 255 / 100) + ", " + d.ratio * 255 / 100 + ", 0)";
                } else if (d.ratio >= 20 && d.ratio < 40) {
                    return "rgb(" + (255 - d.ratio * 255 / 100) + ", " + (102 + d.ratio * 255 / 100) + ", 0)";
                } else {
                    return "rgb(" + (255 - d.ratio * 255 / 100) + ", 0, 0)";
                }
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        nodes2.append('title')
            .text((d) => d.id.substring(0, 1) === "p" ? `Percentuale Ratio: ${d.fPerc}% - ${d.sPerc}%` : `ID: ${d.id}\nLOGIN: ${d.login}\nERRORI: ${d.error}\nRATIO: ${d.ratio}`);


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
        this.createSvg();
        this.force = this.createForce();

        this.getNodesLinks(dataset, this.width, this.height, this.circlesRadius, this.circlesRadiusGrowth, this.force);
    }
}