export default class ParallelCoordinates {
  xScale;

  yScale = {
    id: 0, date: 0, ora: 0, event: 0, application: 0, ip: 0,
  };

  margin = {
    top: 30, right: 30, bottom: 30, left: 50,
  };

  width = 1000 - this.margin.left - this.margin.right;

  height = 800 - this.margin.top - this.margin.bottom;

  dimensions = ['id', 'event', 'ora', 'date', /* 'ora', */ 'application', 'ip'];

  // append the svg object to the body of the page
  createSvg() {
    d3.select('#visualization')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  /* function getOraGiorno(data) {
        const date = new Date(data.data);
        date.setFullYear(0, 0, 0);
        return date;
      } */

  getScales(data) {
    this.yScale.id = d3.scalePoint()
      .domain(data.map((d) => d.getId()))
      .range([this.height, 0]);

    this.yScale.event = d3.scalePoint()
      .domain(data.map((d) => d.getEvent()))
      .range([this.height, 0]);

    this.yScale.ora = d3.scaleLinear()
      .domain(d3.extent(data, (d) => d.getDate().getHours()))
      .range([this.height, 0]);

    this.yScale.date = d3.scaleTime()
      .domain(d3.extent(data, (d) => d.getDate()))
      .range([this.height, 0]);

    /* y.ora = d3.scaleTime()
          .domain(d3.extent(data, getOraGiorno))
          .range([height, 0]); */

    this.yScale.application = d3.scalePoint()
      .domain(data.map((d) => d.getApplication()))
      .range([this.height, 0]);

    this.yScale.ip = d3.scalePoint()
      .domain(data.map((d) => d.getIp()))
      .range([this.height, 0]);

    this.xScale = d3.scalePoint()
      .range([0, this.width])
      .padding(1)
      .domain(this.dimensions);

    return [this.xScale, this.yScale];
  }

  drawAxis(x, y) {
    d3.select('body svg g')
      .selectAll('myAxis')
    // For each dimension of the dataset I add a 'g' element:
      .data(this.dimensions).enter()
      .append('g')
    // I translate this element to its right position on the x axis
      .attr('transform', (d) => `translate(${x(d)})`)
    // And I build the axis with the call function
      .each((d, i, nodes) => { d3.select(nodes[i]).call(d3.axisLeft().scale(y[d])); })
    // Add axis title
      .append('text')
      .style('text-anchor', 'middle')
      .attr('y', -9)
      .text((d) => d)
      .style('fill', 'black');
  }

  // eslint-disable-next-line max-len
  // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
  path(d, x, y) {
    const data = d;
    return d3.line()(this.dimensions.map((p) => {
      if (p === 'ora') {
        data[p] = d.getDate().getHours();
      }
      return [x(p), y[p](data[p])];
    }));
  }

  // Draw the lines
  drawLines(data, x, y) {
    d3.select('body svg g')
      .selectAll('.line')
      .data(data, (d, index) => index)
      .enter()
      .append('path')
      .attr('d', (d) => this.path(d, x, y))
      .attr('class', 'line')
      .style('fill', 'none')
      .style('stroke', '#69b3a2')
      .style('opacity', 0.5)

      .on('mouseover', (e) => this.mouseover(e))

      .on('mouseout', () => this.mouseout());

    d3.select('svg g').selectAll('.line')
      .data(data, (d, index) => index)
      .append('title')
      .text((d) => `IP: ${d.getIp()}\nUTENTE: ${d.getId()}\nTIPO EVENTO: ${d.getEvent()}\nDATA: ${d.getDate()}\nAPPLICAZIONE: ${d.getApplication()}`);

    d3.select('svg g').selectAll('.line')
      .data(data, (d, index) => index)
      .exit()
      .remove();
  }

  // eslint-disable-next-line class-methods-use-this
  mouseover(e) {
    d3.selectAll('.line')
      .transition()
      .duration('200')
      .style('opacity', 0.2)
      .style('stroke', 'lightgrey');

    d3.select(e.target)
      .raise();

    d3.select(e.target)
      .transition()
      .duration('200')
      .style('opacity', 1)
      .style('stroke', 'red');
  }

  // eslint-disable-next-line class-methods-use-this
  mouseout() {
    d3.selectAll('.line').transition()
      .duration('500')
      .style('stroke', '#69b3a2')
      .style('opacity', 0.5);
  }

  /**
       * Crea un SVG, disegna gli assi e il parallel coordinates relativo ai dati passati
       * @param {Array} dataset - Array di oggetti.
       * Ogni oggetto contiene i campi: "id", "utente", "data", "tipoEvento", "applicazione", "ip".
       */
  draw(dataset) {
    d3.select('#visualization').html('');

    this.createSvg();
    [this.xScale, this.yScale] = this.getScales(dataset);
    this.drawLines(dataset, this.xScale, this.yScale);
    this.drawAxis(this.xScale, this.yScale);
  }
}
