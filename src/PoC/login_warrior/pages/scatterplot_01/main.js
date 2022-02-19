import { drawScatterPlot, updateScatterPlot } from "./modules/scatterplot.js";
import { createDB, deleteDB, readDB, updateDB } from '../../shared/modules/indexdDB.js';

let sessionData = await readDB();

// TODO: ho bisogno che le funzioni del db siano sincrone
if (!sessionData.plotName) {
  sessionData = {
    plotName: "scatterplot_01",
    plotConfiguragione: {},
    data: sessionData.data
  };

  await deleteDB();
  await createDB();
  await updateDB(sessionData);
}

drawScatterPlot(sessionData.data)

document.querySelector("#filtro-evento").addEventListener("input", (event) => {
  const filtroEvento = (event.target.value).toString(10);
  if (filtroEvento) {
    updateScatterPlot(sessionData.data, sessionData.data.filter(d => d.tipoEvento === filtroEvento));
  } else {
    updateScatterPlot(sessionData.data, sessionData.data);
  }
});
