export default class ScatterPlot2 {
  xScale;

  yScale;

  width = 1000;

  height = 600;

  spacing = 100;

  circlesRadius = 5;

  circlesRadiusGrowth = 6;

  circlesOpacity = 0.4;

  createSvg() {
    d3.select('#visualization')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.spacing / 2},${this.spacing / 2})`);
  }

  static getOraGiorno(dataset) {
    const date = new Date(dataset.getDate());
    date.setFullYear(0, 0, 0);
    return date;
  }

  getScales(dataset) {
    this.xScale = d3.scalePoint()
      .domain(dataset.map((d) => d.getId()))
      .range([0, this.width - this.spacing]);

    this.yScale = d3.scaleTime()
      .domain(d3.extent(dataset, ScatterPlot2.getOraGiorno))
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
      .attr('y', this.height - this.spacing + 35)
      .attr('x', this.width - this.spacing + 30)
      .attr('dx', '.75em')
      .text('Utente');
  }

  drawCircles(dataset, xScale, yScale) {
    d3.select('svg g').selectAll('circle')
      .data(dataset, (d, index) => index)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d.getId()))
      .attr('cy', (d) => yScale(ScatterPlot2.getOraGiorno(d)))
      .attr('r', (d) => (d.getEvent() === 'logout' ? 0 : this.circlesRadius))
      .style('opacity', (d) => (d.getEvent() === 'error' ? 0.7 : this.circlesOpacity))
      .style('fill', (d) => {
        switch (d.getEvent()) {
          case 'login':
            return 'green';
          case 'error':
            return 'red';
          default:
            return 'blu';
        }
      })
      .on('mouseover', (e) => this.mouseover(e))
      .on('mouseout', (e) => this.mouseout(e));

    d3.select('svg g').selectAll('circle')
      .data(dataset, (d, index) => index)
      .append('title')
      .text((d) => `IP: ${d.getIp()}\nUTENTE: ${d.getId()}\nTIPO EVENTO: ${d.getEvent()}\nDATA: ${d.getDate()}\nAPPLICAZIONE: ${d.getApplication()}`);

    d3.select('svg g').selectAll('circle')
      .data(dataset, (d, index) => index)
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
    d3.select('#visualization').html('');

    this.createSvg();
    [this.xScale, this.yScale] = this.getScales(dataset);
    this.drawAxis(this.xScale, this.yScale);
    this.drawCircles(dataset, this.xScale, this.yScale);
  }
}
