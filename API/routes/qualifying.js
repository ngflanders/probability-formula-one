let express = require('express');
let router = express.Router();
let db = require('../util/dbconnection');


router.get('/', function (req, res, next) {
  res.status(400).send('Invalid route: must match Express route "qualifying/:year/:round?"');
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
  let query = "select position, surname, code, drivers.number, constructors.name as constructor, races.name as race, races.round as round from qualifying" +
      " join drivers on drivers.driverId = qualifying.driverId" +
      " join constructors on qualifying.constructorId = constructors.constructorId";
  if (year) {
    query += " join races on races.raceId = qualifying.raceId where year = " + db.escape(year);
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