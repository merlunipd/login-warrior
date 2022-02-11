//variabili
var width = 1400, height = 600, spacing = 100;
var parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S");

//dati di prova
var dati = [
    { "utente": 191, "data": "2021-06-04 12:48:16.000", "tipoEvento": 3, "applicazione": "ERM", "ip": "93.66.96.236" },
    { "utente": 191, "data": "2021-04-30 08:16:04.000", "tipoEvento": 2, "applicazione": "HRW", "ip": "93.66.97.82" },
    { "utente": 191, "data": "2021-04-21 11:52:52.000", "tipoEvento": 3, "applicazione": "ERM", "ip": "2.35.120.104" },
    { "utente": 191, "data": "2021-06-10 14:05:42.000", "tipoEvento": 1, "applicazione": "GTL", "ip": "93.66.96.236" },
    { "utente": 8933, "data": "2021-02-27 14:55:04.000", "tipoEvento": 1, "applicazione": "HRC", "ip": "" },
    { "utente": 8933, "data": "2021-02-27 14:52:27.000", "tipoEvento": 2, "applicazione": "ERM", "ip": "80.182.25.201" },
    { "utente": 8933, "data": "2021-03-23 10:46:31.000", "tipoEvento": 2, "applicazione": "ERM", "ip": "109.52.47.87" },
    { "utente": 8934, "data": "2021-03-04 09:43:35.000", "tipoEvento": 3, "applicazione": "HRW", "ip": "" },
]

//creazione spazio di disegno nel body
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + spacing / 2 + "," + spacing / 2 + ")");

//creazione scale di misura
var xScale = d3.scaleTime()
    .domain([d3.min(dati, function (d) { return new Date(d.data); }), d3.max(dati, function (d) { return new Date(d.data); })])
    .range([0, width - spacing]);

var yScale = d3.scalePoint()
    .domain(dati.map((d) => d.applicazione))
    .range([height - spacing, 0]);
/*
var yScale = d3.scalePoint()
    .domain(["login", "logout", "errore"])
    .range([height - spacing, 0]);

var yScale = d3.scaleLinear()
    .domain([0, 3])
    .range([height - spacing, 0]);
*/

//creazione assi e disegno degli assi
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

svg.append("g").attr("transform", "translate(0," + (height - spacing) + ")").call(xAxis);
svg.append("g").call(yAxis);

//selezione e creazione dei punti
var dots = svg.append("g")
    .selectAll("dot")
    .data(dati);

//disegno dei pallini
dots.enter().append("circle")
    .attr("cx", function (d) { return xScale(new Date(d.data)); })
    .attr("cy", function (d) { return yScale(d.applicazione);
        /*
        switch (d.tipoEvento) {
            case 1:
                return yScale("login");
                break;
            case 2:
                return yScale("errore");
                break;
            case 3:
                return yScale("logout");
                break;
        }
        */
    })
    .attr("r", 5)
    .style("fill", function (d) { 
        
        switch (d.tipoEvento) {
            case 1:
                return "green";
                break;
            case 2:
                return "red";
                break;
            case 3:
                return "grey";
                break;
        }
        
    });

//Nome degli assi
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -30)
    .attr("x", 50)
    .attr("dy", ".75em")
    .text("Applicazione");

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("y", height -spacing + 10)
    .attr("x", width - spacing + 30 )
    .attr("dx", ".75em")
    .text("Data");
