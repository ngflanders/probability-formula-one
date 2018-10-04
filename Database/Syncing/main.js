const mysql = require('mysql');

const util = require("./util");
const checkLastInsert = require("./checkLastInsert");
const queryAPI = require("./queryAPI");
const insertIntoDB = require("./insertIntoDB");
const dbConnectionConfig = require("../../dbConnectionConfig").dbConnectionConfig

const dbQuali = mysql.createConnection(dbConnectionConfig);
const dbResults = mysql.createConnection(dbConnectionConfig);
const dbStandings = mysql.createConnection(dbConnectionConfig);
const dbConstructorStandings = mysql.createConnection(dbConnectionConfig);
dbQuali.connect(dbConnectionError);
dbResults.connect(dbConnectionError);
dbStandings.connect(dbConnectionError);
dbConstructorStandings.connect();

checkLastInsert.checkLastInsert(dbQuali, "qualifying").then(
    function (lastQuali) {
      queryAPI.fetch(lastQuali.year, lastQuali.round+1, "qualifying").then(
          function (qualiInfo) {
            if (qualiInfo.total > 0) {
              insertIntoDB.insertNewQualifying(dbQuali, qualiInfo.RaceTable.Races[0]);
            } else {
              util.noResults("qualifying", qualiInfo.RaceTable);
              dbQuali.end();
            }
          }, function (err) {
            console.error(err);
            console.error("queryAPI.qualifying: rejected Promise")
            dbQuali.end();
          });
    }, function (err) {
      console.error(err);
      console.error("checkLastInsert.qualifying: rejected Promise")
      dbQuali.end();
    });

checkLastInsert.checkLastInsert(dbResults, "results").then(
    function (lastResult) {
      queryAPI.fetch(lastResult.year, lastResult.round+1, "results").then(
          function (raceInfo) {
            if (raceInfo.total > 0) {
              insertIntoDB.insertNewResults(dbResults, raceInfo.RaceTable.Races[0]); // inserts and ends dbConnection
            } else {
              util.noResults("results", raceInfo.RaceTable);
              dbResults.end();
            }
          }, function (err) {
            console.error(err);
            console.error("queryAPI.fetchRaceResults: rejected Promise")
            dbResults.end();
          });
    }, function (err) {
      console.error(err);
      console.error("checkLastInsert.results: rejected Promise")
      dbResults.end();
    });

checkLastInsert.checkLastInsert(dbStandings, "driverstandings").then(
    function (lastStandings) {
      queryAPI.fetch(lastStandings.year, lastStandings.round+1, "driverstandings").then(
          function (standingsInfo) {
            if (standingsInfo.total > 0) {
              insertIntoDB.insertNewDriverStandings(dbStandings, standingsInfo.StandingsTable.StandingsLists[0]);
            } else {
              util.noResults("standings", standingsInfo.StandingsTable);
              dbStandings.end();
            }
          }, function (err) {
            console.error(err);
            console.error("queryAPI.driverstandings: rejected Promise")
            dbStandings.end();
          });
    },
    function (err) {
      console.error(err);
      console.error("checkLastInsert.driverstandings: rejected Promise")
      dbStandings.end();
    });

checkLastInsert.checkLastInsert(dbConstructorStandings, "constructorstandings").then(
    function (lastStandings) {
      queryAPI.fetch(lastStandings.year, lastStandings.round+1, "constructorStandings").then(
          function (standingsInfo) {
            if (standingsInfo.total > 0) {
              insertIntoDB.insertNewConstructorStandings(dbConstructorStandings, standingsInfo.StandingsTable.StandingsLists[0]);
            } else {
              util.noResults("constructorstandings", standingsInfo.StandingsTable);
              dbConstructorStandings.end();
            }
          }, function (err) {
            console.error(err);
            console.error("queryAPI.constructorStandings: rejected Promise")
            dbConstructorStandings.end();
          });
    },
    function (err) {
      console.error(err);
      console.error("checkLastInsert.constructorstandings: rejected Promise")
      dbConstructorStandings.end();
    });


function dbConnectionError(err) {
    if (err) console.error(err);
}