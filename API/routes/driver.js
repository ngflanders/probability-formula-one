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
    let query = "select constructorRef, constructors.name, constructors.nationality, results.number, driverRef, code, forename, surname, dob, d.nationality, d.position, d.points, d.wins, year\n" +
        "from results inner join (select driverRef, number, code, forename, surname, dob, nationality, points, position, wins, c.year, c.raceId, drivers.driverId as drv from drivers\n" +
        "join driverstandings on drivers.driverId = driverstandings.driverId join races on races.raceId = driverstandings.raceId inner join (select a.year, a.raceId from races a\n" +
        "inner join (select year, max(round) maxround from races group by year) b where a.year = b.year and a.round = b.maxround) c where driverRef = " +db.escape(ref) + "and \n" +
        "races.raceId in (c.raceId) order by c.year) d on d.raceId = results.raceId and drv = results.driverId join constructors on results.constructorId = constructors.constructorId order by year;";
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
    let query = "select driverRef, constructorRef, grid, position, positionText, positionOrder, points, fastestLapRank, statusId, year, round, races.name, date " +
        " from drivers join results on drivers.driverId = results.driverId " +
        " join constructors on results.constructorId = constructors.constructorId " +
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