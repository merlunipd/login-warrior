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
    d3.select('#visualization')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.spacing / 2},${this.spacing / 2})`);
  }

  getScales(dataset) {
    this.xScale = d3.scaleTime()
      .domain([
        d3.min(dataset, (d) => new Date(d.getDate())),
        d3.max(dataset, (d) => new Date(d.getDate())),
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
      .data(dataset, (d, index) => index)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(new Date(d.getDate())))
      .attr('cy', (d) => yScale((new Date(d.getDate())).getHours() + (new Date(d.getDate())).getMinutes() / 60))
      .attr('r', this.circlesRadius)
      .style('opacity', this.circlesOpacity)
      .style('fill', (d) => {
        switch (d.getEvent()) {
          case 'login':
            return 'green';
          case 'error':
            return 'red';
          case 'logout':
            return 'grey';
          default:
            return 'blu';
        }
      })
      .on('mouseover', (e) => this.mouseover(e))
      .on('mouseout', (e) => this.mouseout(e));

    d3.select('svg g').selectAll('circle')
      .data(dataset, (d, index) => index)
      .append('title')
      .text((d, index) => `INDEX: ${index}\nIP: ${d.getIp()}\nUTENTE: ${d.getId()}\nTIPO EVENTO: ${d.getEvent()}\nDATA: ${d.getDate()}\nAPPLICAZIONE: ${d.getApplication()}`);

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
