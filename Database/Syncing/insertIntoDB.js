const util = require("./util");

function insertNewQualifying(db, qualifying) {
  var res = [];
  var count = qualifying.QualifyingResults.length;

  let q = "insert into qualifying (raceId, driverId, constructorId, position)\n" +
      "values ((select raceId from myf1db.races where year = ? and round = ?),\n" +
      "        (select  driverId from myf1db.drivers where driverRef = ?),\n" +
      "        (select constructorId from myf1db.constructors where constructorRef = ?),\n" +
      "         ?);";
  qualifying.QualifyingResults.forEach((qr) => {
    let vars = [qualifying.season, qualifying.round, qr.Driver.driverId, qr.Constructor.constructorId, qr.position];

    db.query(q, vars, function (err, result) {
      if (err)
        console.error(err);
      res.push(result.insertId);
      if (--count === 0) {
        console.log(`${util.getDateTime()} - (qualifying): ${res}`);
        db.end();
      }
    });
  });
}

function insertNewResults(db, race) {
  var res = [];
  var teams = {};
  var count = race.Results.length;

  let q = "insert into myf1db.results (raceId, driverId, constructorId, number, grid, position, positionText, positionOrder, points, time, milliseconds, fastestLapRank, statusId)\n" +
      "values((select raceId from myf1db.races where year = ? and round = ?),\n" +
      "       (select  driverId from myf1db.drivers where driverRef = ?),\n" +
      "       (select constructorId from myf1db.constructors where constructorRef = ?),\n" +
      "       ?, ?,?, ?, ?, ?, ?, ?, ?,\n" +
      "       (select statusId from myf1db.status where status = ?));";
  race.Results.forEach((rr, idx) => {
    if (!teams[rr.Constructor.constructorId])
      teams[rr.Constructor.constructorId] = 0;
    teams[rr.Constructor.constructorId] += parseInt(rr.points, 10);

    let vars = [race.season, race.round, rr.Driver.driverId, rr.Constructor.constructorId, rr.number,
      rr.grid, rr.position, rr.positionText, idx + 1, rr.points, rr.Time && rr.Time.time, rr.Time && rr.Time.millis,
      rr.FastestLap && rr.FastestLap.rank, rr.status];

    db.query(q, vars, function (err, result) {
      if (err)
        console.error(err);
      res.push(result.insertId);
      if (--count === 0) {
        console.log(`${util.getDateTime()} - (results): ${res}`);
        db.end();
      }
    });
  });
  constructorResults(db, teams, race.season, race.round);
}

function constructorResults(db, teamPoints, year, round) {
  var prints = [];
  var count = Object.keys(teamPoints).length;
  var q = "insert into myf1db.constructorresults (raceId, constructorId, points)\n" +
      "values((select raceId from myf1db.races where year = ? and round = ?),\n" +
      "       (select constructorId from myf1db.constructors where constructorRef = ?),\n" +
      "       ?)";
  for (let t in teamPoints) {
    db.query(q, [year, round, t, teamPoints[t]], function (err, result) {
      if (err)
        console.error(err);
      prints.push(result.insertId);
      if (--count === 0)
        console.log(`${util.getDateTime()} - (constructorresults): ${prints}`);
    });
  }
}

function insertNewDriverStandings(db, standings) {
  var res = [];
  var count = standings.DriverStandings.length;

  let q = "insert into myf1db.driverstandings (raceId, driverId, points, position, positionText, wins)\n" +
      "values((select raceId from myf1db.races where year = ? and round = ?),\n" +
      "           (select driverId from myf1db.drivers where driverRef = ?),\n" +
      "           ?,?,?,?);";
  standings.DriverStandings.forEach((ds) => {
    let vars = [standings.season, standings.round, ds.Driver.driverId, ds.points, ds.position, ds.positionText, ds.wins];
    db.query(q, vars, function (err, result) {
      if (err)
        console.error(err);
      res.push(result.insertId);
      if (--count === 0) {
        console.log(`${util.getDateTime()} - (driverstandings): ${res}`);
        db.end();
      }
    });
  });
}

function insertNewConstructorStandings(db, standings) {
  var res = [];
  var count = standings.ConstructorStandings.length;

  let q = "insert into myf1db.constructorstandings (raceId, constructorId, points, position, positionText, wins)\n" +
      "values ((select raceId from myf1db.races where year = ? and round = ?),\n" +
      "       (select constructorId from myf1db.constructors where constructorRef = ?),\n" +
      "        ?,?,?,?);";
  standings.ConstructorStandings.forEach((cs) => {
    let vars = [standings.season, standings.round, cs.Constructor.constructorId, cs.points, cs.position, cs.positionText, cs.wins];
    db.query(q, vars, function (err, result) {
      if (err)
        console.error(err);
      res.push(result.insertId);
      if (--count === 0) {
        console.log(`${util.getDateTime()} - (constructorstandings): ${res}`);
        db.end();
      }
    });
  });
}

module.exports = {insertNewQualifying, insertNewResults, insertNewDriverStandings, insertNewConstructorStandings};