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
  let query = "select positionOrder, surname,code,results.number, constructors.name as constructor, constructorRef, points,grid, " +
      "races.name as race, races.round as round, country, driverRef, date from results" +
      " join drivers on drivers.driverId = results.driverId" +
      " join constructors on results.constructorId = constructors.constructorId";
  if (year) {
    query += " join races on races.raceId = results.raceId " +
        "join circuits on races.circuitId = circuits.circuitId where year = " + db.escape(year);
    if (round) {
      query += " and round = " + db.escape(round);
    }
  }
  query += " order by round, positionOrder";
  db.query(query, function (err, result) {
    if (err) {
      console.error(err);
      apiRes.status(500).send("SQL Internal Server Error");
    }
    apiRes.json(result);
  })
}

module.exports = router;