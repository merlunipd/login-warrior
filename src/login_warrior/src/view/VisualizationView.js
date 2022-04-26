import ScatterPlot1 from './drawers/ScatterPlot1.js';
import Sankey1 from './drawers/Sankey1.js';
import ParallelCoordinates from './drawers/ParallelCoordinates.js';
import ScatterPlot2 from './drawers/ScatterPlot2.js';

import FilterId from './filters/FilterId.js';
import FilterIp from './filters/FilterIp.js';
import FilterDate from './filters/FilterDate.js';
import FilterEvent from './filters/FilterEvent.js';
import FilterApplication from './filters/FilterApplication.js';

import Visualization from './Visualization.js';
import HomeButton from './HomeButton.js';
import SaveButton from './SaveButton.js';
import SampleDatasetButton from './SampleDatasetButton.js';
import FilterButton from './FilterButton.js';
import ResetFilterButton from './ResetFilterButton.js';

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

  filterButton;

  resetFilterButton;

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
        this.visualization = new Visualization('#visualization', null, new Sankey1());
        break;
        
      default:
        break;
    }
    this.filterId = new FilterId('#filtro-utente');
    this.filterIp = new FilterIp('#filtro-ip');
    this.filterEvent = new FilterEvent('#filtro-evento');
    this.filterDate = new FilterDate('#date-input');
    this.filterApplication = new FilterApplication('#filtro-app');

    this.homeButton = new HomeButton('#home-button');
    this.saveButton = new SaveButton('#save-session-button');
    this.sampleDatasetButton = new SampleDatasetButton('#sample-dataset-button');
    this.filterButton = new FilterButton('#filter-button');
    this.resetFilterButton = new ResetFilterButton('#reset-button');
  }
}
