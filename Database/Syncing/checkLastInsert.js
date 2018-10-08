function checkLastInsert(db, table) {
  let lastResultsWeHave = "select year, round, races.date, races.time from myf1db." + table + " join myf1db.races on races.raceId = " + table + ".raceId order by year desc, round desc limit 1;";
  return new Promise(function (resolve, reject) {
    db.query(lastResultsWeHave, function (err, result) {
      if (err) {
        reject(err)
      }
      resolve(result[0]);
    });
  })
}

module.exports = {checkLastInsert};