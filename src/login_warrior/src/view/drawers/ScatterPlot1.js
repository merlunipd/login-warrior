export default class ScatterPlot1 {
  xScale;

  yScale;

  width = 1000;

  height = 600;

  spacing = 100;

  circlesRadius = 5;

  circlesRadiusGrowth = 6;

  circlesOpacity = 0.4;

  createSvg() {
    d3.select('#chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.spacing / 2},${this.spacing / 2})`);
  }

  getScales(dataset) {
    this.xScale = d3.scaleTime()
      .domain([
        d3.min(dataset, (d) => new Date(d.data)),
        d3.max(dataset, (d) => new Date(d.data)),
      ])
      .range([0, this.width - this.spacing]);

    this.yScale = d3.scaleLinear()
      .domain([0, 24])
      .range([this.height - this.spacing, 0]);

    return [this.xScale, this.yScale];
  }

  drawAxis(xScale, yScale) {
    d3.select('svg g').append('g')
      .attr('transform', `translate(0,${this.height - this.spacing})`)
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
      .attr('y', this.height - this.spacing + 10)
      .attr('x', this.width - this.spacing + 30)
      .attr('dx', '.75em')
      .text('Data');
  }

  drawCircles(dataset, xScale, yScale) {
    d3.select('svg g').selectAll('circle')
      .data(dataset, (d) => d.id)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(new Date(d.data)))
      .attr('cy', (d) => yScale((new Date(d.data)).getHours() + (new Date(d.data)).getMinutes() / 60))
      .attr('r', this.circlesRadius)
      .style('opacity', this.circlesOpacity)
      .style('fill', (d) => {
        switch (d.tipoEvento) {
          case '1':
            return 'green';
          case '2':
            return 'red';
          case '3':
            return 'grey';
          default:
            return 'blu';
        }
      })
      .on('mouseover', (e) => this.mouseover(e))
      .on('mouseout', (e) => this.mouseout(e));

    d3.select('svg g').selectAll('circle')
      .data(dataset, (d) => d.id)
      .append('title')
      .text((d) => `ID: ${d.id}\nIP: ${d.ip}\nUTENTE: ${d.utente}\nTIPO EVENTO: ${d.tipoEvento}\nDATA: ${d.data}\nAPPLICAZIONE: ${d.applicazione}`);

    d3.select('svg g').selectAll('circle')
      .data(dataset, (d) => d.id)
      .exit()
      .remove();
  }

  mouseover(e) {
    d3.select(e.target)
      .transition()
      .duration('50')
      .attr('r', this.circlesRadius + this.circlesRadiusGrowth)
      .style('opacity', 1)
      .style('stroke', 'black');
  }

  mouseout(e) {
    d3.select(e.target).transition()
      .duration('500')
      .attr('r', this.circlesRadius)
      .style('opacity', this.circlesOpacity)
      .style('stroke', 'none');
  }

  draw(dataset) {
    this.createSvg();
    [this.xScale, this.yScale] = this.getScales(dataset);
    this.drawAxis(this.xScale, this.yScale);
    this.drawCircles(dataset, this.xScale, this.yScale);
  }
}
