import {
  ScatterPlot1, ScatterPlot2, ParallelCoordinates, SankeyDiagram, ForceDirected,
} from './drawers';
import {
  FilterIp, FilterEvent, FilterDate, FilterApplication, FilterId,
} from './filters';
import Visualization from './Visualization';

export default class VisualizationView {
  visualization;

  filterId;

  filterIp;

  filterEvent;

  filterDate;

  filterApplication;

  // mancano i bottoni

  constructor(visualizationIndex) {
    switch (visualizationIndex) {
      case 1:
        this.visualization = new Visualization('#visualization', null, new ScatterPlot1());
        break;
      case 2:
        this.visualization = new Visualization('#visualization', null, new ScatterPlot2());
        break;
      case 3:
        this.visualization = new Visualization('#visualization', null, new ParallelCoordinates());
        break;
      case 4:
        this.visualization = new Visualization('#visualization', null, new SankeyDiagram());
        break;
      case 5:
        this.visualization = new Visualization('#visualization', null, new ForceDirected());
        break;

      default:
        break;
    }
    this.filterId = new FilterId('#filterId');
    this.filterIp = new FilterIp('#filterIp');
    this.filterEvent = new FilterEvent('#filterEvent');
    this.filterDate = new FilterDate('#filterDate');
    this.filterApplication = new FilterApplication('#filterApplication');
  }
}
