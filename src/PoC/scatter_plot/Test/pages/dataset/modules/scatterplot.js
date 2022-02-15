/**
 * Ottiene un array di dati parsato e ne disegna lo scatterplot
 * @param {Array} dati - File CSV da caricare
 * @returns void
 */
const drawScatterplot = (dati) => {
    //variabili
    var width = 1400, height = 600, spacing = 100;

    //Test x: giorno y: ora  colore: tipologia  testo: ip+utente 

    //creazione spazio di disegno nel body
    var svg = d3.select("div")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + spacing / 2 + "," + spacing / 2 + ")");

    //creazione scale di misura
    var xScale = d3.scaleTime()
        .domain([d3.min(dati, function (d) { return new Date(d.data); }), d3.max(dati, function (d) { return new Date(d.data); })])
        .range([0, width - spacing]);

    var yScale = d3.scaleLinear()
        .domain([0, 24])
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
        .attr("cy", function (d) { return yScale((new Date(d.data)).getHours()); })
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

        .attr("r", 5)
        .style("fill", function (d) {

            switch (d.tipoEvento) {
                case "1":
                    return "green";
                    break;
                case "2":
                    return "red";
                    break;
                case "3":
                    return "grey";
                    break;
            }

        });
    /*
    dots.enter().append("text")
        .attr("x", function (d) { return xScale(new Date(d.data)); })
        .attr("y", function (d) { return yScale((new Date(d.data)).getHours()) - 10; })
        .attr("dy", ".35em")
        .text(function (d) { return (d.utente + " / " + d.ip); });
    */
    //Nome degli assi
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -30)
        .attr("x", 0)
        .attr("dy", ".75em")
        .text("Ora");

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("y", height - spacing + 10)
        .attr("x", width - spacing + 30)
        .attr("dx", ".75em")
        .text("Data");
};

export default drawScatterplot;











/* test x: data y: applicazione colore: tipoEvento


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
/*
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
/*
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
*/