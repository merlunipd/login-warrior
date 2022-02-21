// Variabili
const [width, height, spacing] = [1000, 600, 100];
const circlesRadius = 5;
const circlesRadiusGrowth = 6;
const circlesOpacity = 0.4;

// Funzioni ausiliarie
const createSvg = () => {
  d3.select('#scatterplot')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${spacing / 2},${spacing / 2})`);
};

function getOraGiorno(data) {
  let date = new Date(data.data);
  date.setFullYear(0,0,0);
  return date;
}

const getScales = (data) => {
  const xScale = d3.scalePoint()
    .domain(data.map((d) => d.utente))
    .range([0, width - spacing]);

  const yScale = d3.scaleTime()
    .domain(d3.extent(data,getOraGiorno))
    .range([height - spacing, 0]);

  return [xScale, yScale];
};

const drawAxis = (xScale, yScale) => {
  d3.select('svg g').append('g')
    .attr('transform', `translate(0,${height - spacing})`)
    .call(d3.axisBottom(xScale));

  d3.select('svg g').append('g')
    .call(d3.axisLeft(yScale));

  d3.select('svg g').append('text')
    .attr('class', 'y label')
    .attr('text-anchor', 'end')
    .attr('y', -30)
    .attr('x', 0)
    .attr('dy', '.75em')
    .text('Ora');

  d3.select('svg g').append('text')
    .attr('class', 'x label')
    .attr('text-anchor', 'end')
    .attr('y', height - spacing + 35)
    .attr('x', width - spacing + 30)
    .attr('dx', '.75em')
    .text('Utente');
};

const drawCircles = (data, xScale, yScale) => {
  d3.select('svg g').selectAll('circle')
    .data(data, (d) => d.id)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d.utente))
    .attr('cy', (d) => yScale(getOraGiorno(d)))
    .attr("r", function (d) {
      if (d.tipoEvento == "3") {
          return 0;
      }
      return circlesRadius;
  })
    .style("opacity", function (d) {

      switch (d.tipoEvento) {
          case "1":
              return circlesOpacity;
          case "2":
              return 0.7;
      }

  })
    .style('fill', (d) => {
      switch (d.tipoEvento) {
        case '1':
          return 'green';
        case '2':
          return 'red';
        default:
          return 'blu';
      }
    })
    .on('mouseover', function () {
      d3.select(this)
        .transition()
        .duration('50')
        .attr('r', circlesRadius + circlesRadiusGrowth)
        .style('opacity', 1)
        .style('stroke', 'black');
    })
    .on('mouseout', function () {
      d3.select(this).transition()
        .duration('500')
        .attr('r', circlesRadius)
        .style('opacity', circlesOpacity)
        .style('stroke', 'none');
    });

  d3.select('svg g').selectAll('circle')
    .data(data, (d) => d.id)
    .append('title')
    .text((d) => `ID: ${d.id}\nIP: ${d.ip}\nUTENTE: ${d.utente}\nTIPO EVENTO: ${d.tipoEvento}\nDATA: ${d.data}\nAPPLICAZIONE: ${d.applicazione}`);

  d3.select('svg g').selectAll('circle')
    .data(data, (d) => d.id)
    .exit()
    .remove();
};

/**
 * Crea un SVG, disegna gli assi e lo scatter plot relativo ai dati passati
 * @param {Array} data - Array di oggetti. 
 * Ogni oggetto contiene i campi: "id", "utente", "data", "tipoEvento", "applicazione", "ip". 
 */
const drawScatterPlot = (data) => {
  createSvg();
  const [xScale, yScale] = getScales(data);
  drawAxis(xScale, yScale);
  drawCircles(data, xScale, yScale);
};

/**
 * Aggiorna l'SVG con i nuovi dati ma mantenendo scala e assi dei dati iniziali
 * @param {Array} dataInitial - Array di oggetti iniziali, per disegnare con le scale iniziali
 * @param {Array} dataUpdated - Array di oggetti da disegnare
 */
const updateScatterPlot = (dataInitial, dataUpdated) => {
  const [xScale, yScale] = getScales(dataInitial);
  drawCircles(dataUpdated, xScale, yScale);
};

export { drawScatterPlot, updateScatterPlot };
