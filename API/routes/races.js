let express = require('express');
let router = express.Router();
let db = require('../util/dbconnection');


router.get('/', function (req, res, next) {
  res.status(400).send('Invalid route: must match Express route "races/:year/:round?"');
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
  let query = "select races.name, year, round, date, time, circuitRef, circuits.name, location, country, lat, lng\n" +
      "from races join circuits on races.circuitId = circuits.circuitId ";
  if (year) {
    query += " where year = " + db.escape(year);
    if (round) {
      query += " and round = " + db.escape(round);
    }
  }
  query += " order by round";
  db.query(query, function (err, result) {
    if (err) {
      console.error(err);
      apiRes.status(500).send("SQL Internal Server Error");
    }
    apiRes.json(result);
  })
}

module.exports = router;