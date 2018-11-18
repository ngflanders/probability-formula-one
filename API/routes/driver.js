let express = require('express');
let router = express.Router();
let db = require('../util/dbconnection');

router.get('/', function (req, res, next) {
  res.status(400).send('Invalid route: must match Express route "driver/:driverRef"');
});

router.get('/:driverRef/', function (req, res, next) {
  const ref = req.params.driverRef;
  pastSeasonsStanding(res, ref);
});

router.get('/:driverRef/:year', function (req, res, next) {
  const ref = req.params.driverRef;
  const year = req.params.year;
  thisSeasonResults(res, ref, year);
});

function pastSeasonsStanding(apiRes, ref) {
  if (ref) {
    let query = "select driverRef, number, code, forename, surname, dob, nationality, points, position,wins, c.year from drivers " +
        " join driverstandings on drivers.driverId = driverstandings.driverId join races on races.raceId = driverstandings.raceId " +
        " inner join (select a.year, raceId from races a inner join (select year, max(round) maxround from races group by year) b " +
        " where a.year = b.year and a.round = b.maxround) c where driverRef = " + db.escape(ref) + " and races.raceId in (c.raceId) order by c.year;";
    db.query(query, function (err, result) {
      if (err) {
        console.error(err);
        apiRes.status(500).send("SQL Internal Server Error");
      }

      console.log(result);
      if (result.length === 0) {
        db.query("select driverRef, number, code, forename, surname, dob, nationality from drivers where driverRef = " + db.escape(ref), function (err, result) {
          if (err) {
            console.error(err);
            apiRes.status(500).send("SQL Internal Server Error");
          }
          apiRes.json(result);
        })
      } else {
        apiRes.json(result);
      }
    });
  }
}

function thisSeasonResults(apiRes, ref, year) {
  if (ref && year) {
    let query = "select driverRef, constructorId, grid, position, positionText, positionOrder, points, fastestLapRank, statusId, year, round, name, date " +
        " from drivers join results on drivers.driverId = results.driverId " +
        "join races on races.raceId = results.raceId " +
        "where driverRef = " + db.escape(ref) + " and year = " + db.escape(year) + " order by year, round;";
    db.query(query, function (err, result) {
      if (err) {
        console.error(err);
        apiRes.status(500).send("SQL Internal Server Error");
      }
      apiRes.json(result);
    });
  }
}

module.exports = router;