var width = 1000, height = 600, spacing = 120;
var parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S");

var dati = [
    { "utente": 191, "data": "2021-06-04 12:48:16.000", "tipoEvento": 3, "applicazione": "ERM", "ip": "93.66.96.236"},
    { "utente": 191, "data": "2021-04-30 08:16:04.000", "tipoEvento": 2, "applicazione": "ERM", "ip": "93.66.97.82"},
    { "utente": 191, "data": "2021-04-21 11:52:52.000", "tipoEvento": 3, "applicazione": "ERM", "ip": "2.35.120.104"},
    { "utente": 191, "data": "2021-06-10 14:05:42.000", "tipoEvento": 1, "applicazione": "ERM", "ip": "93.66.96.236"}
]

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + spacing / 2 + "," + spacing / 2 + ")");

var xScale = d3.scaleTime()
    .domain([d3.min(dati, function (d) { return new Date(d.data); }), d3.max(dati, function (d) { return new Date(d.data); }) ])
    .range([0, width - spacing]);

var yScale = d3.scaleLinear()
    .domain([0, 3])
    .range([height - spacing, 0]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

svg.append("g").attr("transform", "translate(0," + (height - spacing) + ")").call(xAxis);
svg.append("g").call(yAxis);

var dots = svg.append("g")
    .selectAll("dot")
    .data(dati);

dots.enter().append("circle")
    .attr("cx", function (d) { return xScale(new Date(d.data)); })
    .attr("cy", function (d) { return yScale(d.tipoEvento); })
    .attr("r", 5)
    .style("fill", "red");