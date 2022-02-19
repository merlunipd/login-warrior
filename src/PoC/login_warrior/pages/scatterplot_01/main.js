import { drawScatterPlot, updateScatterPlot } from "./modules/scatterplot.js";
import { readDB } from '../../shared/modules/indexdDB.js';

let data = await readDB();

drawScatterPlot(data)

document.querySelector("#filtro-evento").addEventListener("input", (event) => {
  const filtroEvento = (event.target.value).toString(10);
  if (filtroEvento) {
    updateScatterPlot(data, data.filter(d => d.tipoEvento === filtroEvento));
  } else {
    updateScatterPlot(data, data);
  }
});
