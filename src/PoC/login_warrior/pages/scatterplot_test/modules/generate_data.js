const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * max + min)
}

const generateData = (numberOfPoints) => {
  let generatedData = [];
  for (let i = 0; i < numberOfPoints; i++) {
    generatedData.push({
      id: i,
      utente: randomNumber(0, 20).toString(10),
      data: randomDate(new Date(2012, 0, 1), new Date()).toString(),
      tipoEvento: randomNumber(1, 3).toString(10),
      applicazione: "ERM",
      ip: randomNumber(0, 255).toString() + "." +
        randomNumber(0, 255).toString() + "." +
        randomNumber(0, 255).toString() + "." +
        randomNumber(0, 255).toString()
    });
  }
  return generatedData;
};

export default generateData;