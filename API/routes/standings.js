let express = require('express');
let router = express.Router();
let db = require('../util/dbconnection');


router.get('/', function (req, res, next) {
  res.status(400).send('Invalid route: must match Express route "standings/drivers~constructors/:year/:round?"');
});

router.get('/drivers/:year/', function (req, res, next) {
  const year = req.params.year;
  fetchDriverStandings(res, year);
});

router.get('/drivers/:year/:round/', function (req, res, next) {
  const year = req.params.year;
  const round = req.params.round;
  fetchDriverStandings(res, year, round);
});

function fetchDriverStandings(apiRes, year, round) {
  let query = "select position, points, wins, driverRef, forename, surname, code, nationality from myf1db.driverstandings " +
      " join drivers on drivers.driverId = driverstandings.driverId ";
  if (year) {
    query += " join races on races.raceId = driverstandings.raceId " +
        " where year = " + db.escape(year);
    if (round) {
      query += " and round = " + db.escape(round);
    }
  }
  query += " order by position";
  db.query(query, function (err, result) {
    if (err) {
      console.error(err);
      apiRes.status(500).send("SQL Internal Server Error");
    }
    apiRes.json(result);
  })
}


router.get('/constructors/:year/', function (req, res, next) {
  const year = req.params.year;
  fetchConstructorStandings(res, year);
});

router.get('/constructors/:year/:round', function (req, res, next) {
  const year = req.params.year;
  const round = req.params.round;
  fetchConstructorStandings(res, year, round);
});

function fetchConstructorStandings(apiRes, year, round) {
  let query = "select position, points, wins,constructorRef, constructors.name, nationality from myf1db.constructorstandings " +
      "join constructors on constructors.constructorId = constructorstandings.constructorId ";
  if (year) {
    query += " join races on races.raceId = constructorstandings.raceId " +
      " where year = " + db.escape(year);
    if (round) {
      query += " and round = " + db.escape(round);
    }
  }
  query += " order by position";
  db.query(query, function (err, result) {
    if (err) {
      console.error(err);
      apiRes.status(500).send("SQL Internal Server Error");
    }
    apiRes.json(result);
  })
}

module.exports = router;