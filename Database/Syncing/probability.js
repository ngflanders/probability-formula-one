const mysql = require('mysql');
const monteCarlo = require('./monteCarlo');

const dbConnectionConfig = require("../../dbConnectionConfig").dbConnectionConfig;
const fetchDb = mysql.createConnection(dbConnectionConfig);
const storeDb = mysql.createConnection(dbConnectionConfig);
fetchDb.connect();

getStandings(2018).then(sqlResult => {
  fetchDb.end();

  // Organizing the object for data manipulation
  if (sqlResult) {
    let grouped = organizeObject(sqlResult);

    let realResults = [];
    for (let i = 0; i < grouped.length; i++) {
      var driverResults = grouped[i];
      realResults.push({driverRef: driverResults[0].driverRef, raceResults: []});
      for (let j = 0; j < driverResults.length; j++) {
        realResults[i].raceResults.push({race: driverResults[j].race, results: driverResults[j].results});
      }
      realResults[i].standings = driverResults[driverResults.length - 1].standings;
      realResults[i].standings.averagePoints = realResults[i].standings.points / realResults[i].raceResults.length
    }

    // StdDev
    for (let i = 0; i < realResults.length; i++) {
      let sqrDiffs = [];
      for (let j = 0; j < realResults[i].raceResults.length; j++) {
        let avg = realResults[i].standings.averagePoints;
        let racePoints = realResults[i].raceResults[j].results.points;
        let diff = avg - racePoints;
        sqrDiffs.push(diff * diff);
      }
      let avgSqrDiff = sqrDiffs.reduce((sum, value) => sum + value, 0) / sqrDiffs.length;
      realResults[i].standings.stdDev = Math.sqrt(avgSqrDiff);
      realResults[i].numRaces = realResults[i].raceResults.length;
      delete realResults[i].raceResults;
    }

    let arrHist = [];
    for (let e = 0; e < 20; e++) {
      arrHist.push({});
    }

    const ITERATIONS = 50000;
    for (let i = 0; i < ITERATIONS; i++) {
      let monteCarloRes = monteCarlo.monteCarlo(realResults);
      for (let j = 0; j < monteCarloRes.length; j++) {
        let dvr = monteCarloRes[j];
        if (!arrHist[j][dvr]) {
          arrHist[j][dvr] = 1;
        } else {
          arrHist[j][dvr] += 1;
        }
      }
    }
    // console.log(arrHist);

    for (let j = 0; j < arrHist.length; j++) {
      let placeHist = arrHist[j];
      for (d in placeHist) {
        placeHist[d] = parseFloat((placeHist[d] / ITERATIONS).toFixed(4));
      }
    }

    storeResults(arrHist, 1005)
  }
});

function getStandings(year) {
  let getDriverStandings = "select results.number, results.positionOrder as ResultPosition, results.points as ResultPoints,\n" +
      " races.year, races.round, races.name, races.raceId,\n" +
      " drivers.driverRef, drivers.code, drivers.driverId, driverstandings.points as StandingsPoints, driverstandings.position as StandingsPosition\n" +
      "from results\n" +
      "join races on races.raceId = results.raceId\n" +
      "join drivers on drivers.driverId = results.driverId\n" +
      "join driverstandings on drivers.driverId = driverstandings.driverId and races.raceId = driverstandings.raceId\n" +
      "where year = " + year + " order by round";
  return new Promise(function (resolve, reject) {
    fetchDb.query(getDriverStandings, function (err, result) {
      if (err) {
        reject(err)
      }
      resolve(result);
    });
  })
}

function organizeObject(sqlResult) {
  let newRes = sqlResult.map(r => {
    return {
      driverRef: r.driverRef,
      driver: {
        code: r.code,
        number: r.number,
        ref: r.driverRef,
        id: r.driverId
      },
      results: {
        position: r.ResultPosition,
        points: r.ResultPoints
      },
      race: {
        year: r.year,
        round: r.round,
        name: r.name,
        id: r.raceId
      },
      standings: {
        position: r.StandingsPosition,
        points: r.StandingsPoints
      }
    }
  });

  return myGroupBy(newRes, 'driverRef');
}

function myGroupBy(xs, key) {
  let grouped = xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});

  let arr = [];
  for (let s in grouped) {
    arr.push(grouped[s])
  }
  return arr;
}

function storeResults(places, raceId) {
  storeDb.connect();
  let count = places.length;
  const values = "((select driverId from drivers where driverRef = ?), ?, ?, ?)";
  const storeSimulatedStandings = "insert into myf1db.simulatedfinalstandings (driverId, calculatedFromRaceId, Place, Probability)\n" +
      "values ";
  places.forEach((placeObj, placeIdx) => {
    let q = storeSimulatedStandings;
    let vars = [];
    for (const dvr in placeObj) {
      q += values + ",";
      vars.push(dvr, raceId, placeIdx+1, placeObj[dvr]);
    }
    storeDb.query(q.substring(0,q.length-1), vars, function (err, result) {
      if (err)
        console.error(err);
      if (--count === 0) {
        storeDb.end();
      }
    });
  });
}