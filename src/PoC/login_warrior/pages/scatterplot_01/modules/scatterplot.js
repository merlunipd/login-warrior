// Varuabili
const [width, height, spacing] = [1000, 600, 100];
const circlesRadius = 5;
const circlesRadiusGrowth = 6;
const circlesOpacity = 0.4;

// Funzioni ausiliarie
const createSvg = () => {
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + spacing / 2 + "," + spacing / 2 + ")");
};

const getScales = (data) => {
  const xScale = d3.scaleTime()
    .domain([
      d3.min(data, d => new Date(d.data)),
      d3.max(data, d => new Date(d.data))
    ])
    .range([0, width - spacing]);

  const yScale = d3.scaleLinear()
    .domain([0, 24])
    .range([height - spacing, 0]);

  return [xScale, yScale];
};

const drawAxis = (xScale, yScale) => {
  d3.select("svg g").append("g")
    .attr("transform", "translate(0," + (height - spacing) + ")")
    .call(d3.axisBottom(xScale));

  d3.select("svg g").append("g")
    .call(d3.axisLeft(yScale));

  d3.select("svg g").append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -30)
    .attr("x", 0)
    .attr("dy", ".75em")
    .text("Ora");

  d3.select("svg g").append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("y", height - spacing + 10)
    .attr("x", width - spacing + 30)
    .attr("dx", ".75em")
    .text("Data");
};

const drawCircles = (data, xScale, yScale) => {
  d3.select("svg g").selectAll("circle")
    .data(data, d => d.id)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(new Date(d.data)); })
    .attr("cy", function (d) { return yScale((new Date(d.data)).getHours() + (new Date(d.data)).getMinutes() / 60); })
    .attr("r", circlesRadius)
    .style("opacity", circlesOpacity)
    .style("fill", function (d) {
      switch (d.tipoEvento) {
        case "1":
          return "green";
        case "2":
          return "red";
        case "3":
          return "grey";
      }
    })
    .on('mouseover', function () {
      d3.select(this)
        .transition()
        .duration('50')
        .attr("r", circlesRadius + circlesRadiusGrowth)
        .style("opacity", 1)
        .style("stroke", "black");
    })
    .on('mouseout', function () {
      d3.select(this).transition()
        .duration('500')
        .attr("r", circlesRadius)
        .style("opacity", circlesOpacity)
        .style("stroke", "none");
    });

  d3.select("svg g").selectAll("circle")
    .data(data, d => d.id)
    .append("title")
    .text(d => `ID: ${d.id}\nIP: ${d.ip}\nUTENTE: ${d.utente}\nTIPO EVENTO: ${d.tipoEvento}\nDATA: ${d.data}\nAPPLICAZIONE: ${d.applicazione}`);

  d3.select("svg g").selectAll("circle")
    .data(data, d => d.id)
    .exit()
    .remove();
};

const drawScatterPlot = (data) => {
  createSvg();
  const [xScale, yScale] = getScales(data);
  drawAxis(xScale, yScale);
  drawCircles(data, xScale, yScale);
};

const updateScatterPlot = (dataInitial, dataUpdated) => {
  const [xScale, yScale] = getScales(dataInitial);
  drawCircles(dataUpdated, xScale, yScale)
};

export { drawScatterPlot, updateScatterPlot };