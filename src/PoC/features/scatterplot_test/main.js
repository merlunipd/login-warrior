import { drawScatterPlot, updateScatterPlot } from "./modules/scatterplot.js";
import generateData from "./modules/generate_data.js";

const testData = generateData(50);

drawScatterPlot(testData)

document.querySelector("#filtro-evento").addEventListener("input", (event) => {
  const filtroEvento = (event.target.value).toString(10);
  if (filtroEvento) {
    updateScatterPlot(testData, testData.filter(d => d.tipoEvento === filtroEvento));
  } else {
    updateScatterPlot(testData, testData);
  }
});
