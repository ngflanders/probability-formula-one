const PointsMap = {1:25,2:18,3:15,4:12,5:10,6:8,7:6,8:4,9:2,10:1};
const CRASH_ODDS = 0.01;

// function monteCarlo(preppedData) {
//   const racesLeft = 21 - preppedData[0].numRaces;
//   for (let i = 0; i < preppedData.length; i++) {
//     preppedData[i].futureResults = [];
//     for (let j = 0; j < racesLeft; j++) {
//       // var position = normal_random(preppedData[i].standings.averagePosition,preppedData[i].standings.positionStdDev);
//       var position = normal_random(preppedData[i].standings.averagePosition,8);
//       position = Math.round(position);
//
//       preppedData[i].futureResults.push(position);
//     }
//     preppedData[i].futureTotal = preppedData[i].standings.points + preppedData[i].futureResults.reduce((total, num) => {
//       num = num > 11 ? 11 : num < 1 ? 1 : num;
//       total += PointsMap[num] || 0;
//       return total
//     },0)
//   }
//   preppedData = preppedData.sort((a,b) => b.futureTotal - a.futureTotal);
//   return preppedData.map(r => r.driverRef);
// }

// Points Monte Carlo
function monteCarlo(preppedData, racesLeft) {
  for (let i = 0; i < preppedData.length; i++) {
    preppedData[i].futureResults = [];
    for (let j = 0; j < racesLeft; j++) {
      let points = 0;
      if (Math.random() > CRASH_ODDS) {
        points = normal_random(preppedData[i].standings.averagePoints, preppedData[i].standings.pointsStdDev);
        points = points > 25 ? 25 : points < 0 ? 0 : points;
      }
      preppedData[i].futureResults.push(points)
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
