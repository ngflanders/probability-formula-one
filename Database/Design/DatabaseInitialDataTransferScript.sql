# insert into myf1db.circuits (circuitId, circuitRef, name, location, country, lat, lng)
# select circuitId, circuitRef, name, location, country, lat, lng from f1db.circuits where circuits.circuitId in (select f1db.races.circuitId from f1db.races where races.year >2005 );

# insert into myf1db.constructorresults (constructorResultsId, raceId, constructorId, points)
# select constructorResultsId, raceId, constructorId, points from f1db.constructorresults where raceId in (select raceId from f1db.races where races.year > 2005)

# insert into myf1db.constructors (constructorId, constructorRef, name, nationality)
# select constructorId, constructorRef, name, nationality from f1db.constructors where constructorId in
#                             (select constructorId from f1db.results join f1db.races on races.raceId = results.raceId where races.year > 2005);

# insert into myf1db.constructorstandings (constructorStandingsId, raceId, constructorId, points, position, positionText, wins)
# select constructorStandingsId, raceId, constructorId, points, position, positionText, wins from f1db.constructorstandings
# where raceId in (select raceId from f1db.races where races.year > 2005)

# insert into myf1db.drivers (driverId, driverRef, number, code, forename, surname, dob, nationality)
# select driverId, driverRef, number, code, forename, surname,dob,nationality from f1db.drivers
# where driverId in (select results.driverId from f1db.results join f1db.races on races.raceId = results.raceId where races.year > 2005);

#  insert into myf1db.driverstandings (driverStandingsId, raceId, driverId, points, position, positionText, wins)
# select driverStandingsId, raceId, driverId, points, position, positionText, wins from f1db.driverstandings
# where raceId in (select raceId from f1db.races where races.year > 2005)

# insert into myf1db.qualifying (qualifyId, raceId, driverId, constructorId, position)
# SELECT qualifyId, raceId, driverId, constructorId, position from f1db.qualifying
# where raceId in (select raceId from f1db.races where races.year > 2005)

# insert into myf1db.races (raceId, year, round, circuitId, name, date, time)
# SELECT raceId,year, round, circuitId, name, date, time from f1db.races where year > 2005

# insert into myf1db.results (raceId, driverId, constructorId, number, grid, position, positionText, positionOrder, points, time, milliseconds, fastestLapRank, statusId)
# SELECT raceId, driverId, constructorId, number, grid, position, positionText, positionOrder, points, time, milliseconds, f1db.results.rank, statusId from f1db.results
# where raceId in (select raceId from f1db.races where races.year > 2005)

# insert into myf1db.seasons (year)
# select year from f1db.seasons where year > 2005

# insert into myf1db.status (statusId, status)
# select statusId, status from f1db.status