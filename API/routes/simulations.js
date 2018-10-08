let express = require('express');
let router = express.Router();
let db = require('../util/dbconnection');


router.get('/', function (req, res, next) {
  res.status(400).send('Invalid route: must match Express route "results/:year/:round?"');
});

router.get('/:year/', function (req, res, next) {
  const year = req.params.year;
  fetchResults(res, year);
});

router.get('/:year/:round', function (req, res, next) {
  const year = req.params.year;
  const round = req.params.round;
  fetchResults(res, year, round);
});

function fetchResults(apiRes, year, round) {
  let query = "select place, drivers.code, Probability, year, round, driverRef, drivers.number from simulatedfinalstandings\n" +
      "join drivers on drivers.driverId = simulatedfinalstandings.driverId";
  if (year) {
    query += " join races on races.raceId = simulatedfinalstandings.calculatedFromRaceId " +
        "where races.year = " + db.escape(year);
    if (round) {
      query += " and races.round = " + db.escape(round);
    } else {
      query += " and round = (select MAX(round) from simulatedfinalstandings join races on raceId = calculatedFromRaceId where year = " + db.escape(year) + ")"
    }
  }
  query += " order by place, probability desc";
  db.query(query, function (err, result) {
    if (err) {
      console.error(err);
      apiRes.status(500).send("SQL Internal Server Error");
    }
    apiRes.json(result);
  })
}

module.exports = router;