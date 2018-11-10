insert into myf1db.circuits (circuitId, circuitRef, name, location, country, lat, lng)
select circuitId, circuitRef, name, location, country, lat, lng from basef1db.circuits;

insert into myf1db.constructorresults (constructorResultsId, raceId, constructorId, points)
select constructorResultsId, raceId, constructorId, points from basef1db.constructorResults;

insert into myf1db.constructors (constructorId, constructorRef, name, nationality)
select constructorId, constructorRef, name, nationality from basef1db.constructors;

insert into myf1db.constructorstandings (constructorStandingsId, raceId, constructorId, points, position, positionText, wins)
select constructorStandingsId, raceId, constructorId, points, position, positionText, wins from basef1db.constructorStandings

insert into myf1db.drivers (driverId, driverRef, number, code, forename, surname, dob, nationality)
select driverId, driverRef, number, code, forename, surname,dob,nationality from basef1db.drivers

insert into myf1db.driverstandings (driverStandingsId, raceId, driverId, points, position, positionText, wins)
select driverStandingsId, raceId, driverId, points, position, positionText, wins from basef1db.driverStandings

insert into myf1db.qualifying (qualifyId, raceId, driverId, constructorId, position)
SELECT qualifyId, raceId, driverId, constructorId, position from basef1db.qualifying

insert into myf1db.races (raceId, year, round, circuitId, name, date, time)
SELECT raceId,year, round, circuitId, name, date, time from basef1db.races;

insert into myf1db.results (raceId, driverId, constructorId, number, grid, position, positionText, positionOrder, points, time, milliseconds, fastestLapRank, statusId)
SELECT raceId, driverId, constructorId, number, grid, position, positionText, positionOrder, points, time, milliseconds, basef1db.results.rank, statusId from basef1db.results;

insert into myf1db.seasons (year)
select year from basef1db.seasons;

insert into myf1db.status (statusId, status)
select statusId, status from basef1db.status;
