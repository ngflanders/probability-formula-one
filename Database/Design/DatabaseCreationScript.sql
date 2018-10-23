create database if not exists myf1db;
use myf1db;

create table if not exists circuits
(
	circuitId int auto_increment
		primary key,
	circuitRef varchar(255) default '' not null,
	name varchar(255) default '' not null,
	location varchar(255) null,
	country varchar(255) null,
	lat float null,
	lng float null
)
engine=MyISAM charset=utf8
;

create table if not exists constructorresults
(
	constructorResultsId int auto_increment
		primary key,
	raceId int default '0' not null,
	constructorId int default '0' not null,
	points float null
)
engine=MyISAM charset=utf8
;

create table if not exists constructors
(
	constructorId int auto_increment
		primary key,
	constructorRef varchar(255) default '' not null,
	name varchar(255) default '' not null,
	nationality varchar(255) null,
	constraint name
		unique (name)
)
engine=MyISAM charset=utf8
;

create table if not exists constructorstandings
(
	constructorStandingsId int auto_increment
		primary key,
	raceId int default '0' not null,
	constructorId int default '0' not null,
	points float default '0' not null,
	position int null,
	positionText varchar(255) null,
	wins int default '0' not null
)
engine=MyISAM charset=utf8
;

create table if not exists drivers
(
	driverId int auto_increment
		primary key,
	driverRef varchar(255) default '' not null,
	number int null,
	code varchar(3) null,
	forename varchar(255) default '' not null,
	surname varchar(255) default '' not null,
	dob date null,
	nationality varchar(255) null
)
engine=MyISAM charset=utf8
;

create table if not exists driverstandings
(
	driverStandingsId int auto_increment
		primary key,
	raceId int default '0' not null,
	driverId int default '0' not null,
	points float default '0' not null,
	position int null,
	positionText varchar(255) null,
	wins int default '0' not null
)
engine=MyISAM charset=utf8
;

create table if not exists qualifying
(
	qualifyId int auto_increment
		primary key,
	raceId int default '0' not null,
	driverId int default '0' not null,
	constructorId int default '0' not null,
	position int null
)
engine=MyISAM charset=utf8
;

create table if not exists races
(
	raceId int auto_increment
		primary key,
	year int default '0' not null,
	round int default '0' not null,
	circuitId int default '0' not null,
	name varchar(255) default '' not null,
	date date default '0000-00-00' not null,
	time time null
)
engine=MyISAM charset=utf8
;

create table if not exists results
(
	resultId int auto_increment
		primary key,
	raceId int default '0' not null,
	driverId int default '0' not null,
	constructorId int default '0' not null,
	number int null,
	grid int default '0' not null,
	position int null,
	positionText varchar(255) default '' not null,
	positionOrder int default '0' not null,
	points float default '0' not null,
	time varchar(255) null,
	milliseconds int null,
	fastestLapRank int default '0' null,
	statusId int default '0' not null
)
engine=MyISAM charset=utf8
;

create table if not exists seasons
(
	year int default '0' not null
		primary key
)
engine=MyISAM charset=utf8
;

create table if not exists status
(
	statusId int auto_increment
		primary key,
	status varchar(255) default '' not null
)
engine=MyISAM charset=utf8
;

create table simulatedfinalstandings
(
	simulatedFinalStandingsId int auto_increment
		primary key,
	driverId int not null,
	calculatedFromRaceId int not null,
	Place int not null,
	Probability float not null
)
;

