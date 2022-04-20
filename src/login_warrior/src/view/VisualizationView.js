import ScatterPlot1 from "./drawers/ScatterPlot1.js";

import FilterId from "./filters/FilterId.js";
import FilterIp from "./filters/FilterIp.js";
import FilterDate from "./filters/FilterDate.js";
import FilterEvent from "./filters/FilterEvent.js";
import FilterApplication from "./filters/FilterApplication.js";

import Visualization from './Visualization.js';
import HomeButton from "./HomeButton.js"
import SaveButton from "./SaveButton.js"
import SampleDatasetButton from "./SampleDatasetButton.js"

export default class VisualizationView {
  visualization;

  filterId;

  filterIp;

  filterEvent;

  filterDate;

  filterApplication;

  homeButton;

  saveButton;

  sampleDatasetButton;

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

    this.homeButton = new HomeButton("#home-button");
    this.saveButton = new SaveButton("#save-session-button");
    this.sampleDatasetButton = new SampleDatasetButton("#sample-dataset-button");
  }
}
