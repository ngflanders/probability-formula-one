function monteCarlo(preppedData) {
  const racesLeft = 21 - preppedData[0].numRaces;
  for (let i = 0; i < preppedData.length; i++) {
    preppedData[i].futureResults = [];
    for (let j = 0; j < racesLeft; j++) {
      preppedData[i].futureResults.push(normal_random(preppedData[i].standings.averagePoints,preppedData[i].standings.stdDev))
    }
    preppedData[i].futureTotal = preppedData[i].standings.points + preppedData[i].futureResults.reduce((total, num) => total + num)
  }
  preppedData = preppedData.sort((a,b) => b.futureTotal - a.futureTotal);
  return preppedData.map(r => r.driverRef);
}


function normal_random(mean, variance) {
  if (mean == undefined)
    mean = 0.0;
  if (variance == undefined)
    variance = 1.0;
  var V1, V2, S;
  do {
    var U1 = Math.random();
    var U2 = Math.random();
    V1 = 2 * U1 - 1;
    V2 = 2 * U2 - 1;
    S = V1 * V1 + V2 * V2;
  } while (S > 1);

  X = Math.sqrt(-2 * Math.log(S) / S) * V1;
  X = mean + Math.sqrt(variance) * X;
  return X;
}


module.exports = {monteCarlo};
