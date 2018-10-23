# Probability Formula One
Modern formula one informational site featuring retrospective statistics.

## Development Setup
### Database
1. Download MySQL server and get it set up.
2. Run the `Database/Design/DatabaseCreationScript.sql` which will create a `myf1db` database and tables.
3. Now we will clone some historical data to get our database caught up. [ergast.com](http://ergast.com/mrd/) provides an API to get historical data, or a clone of the database they use. They have a strict policy on frequency of API hits (4/sec and 200/hr), so it is better if our site runs on our own API rather than use theirs. Download their MySQL database dump from [here](http://ergast.com/mrd/db/). 4. In your MySQL server, `create` and `use` a new database `f1db`. Run the `f1db.sql` that you downloaded from [ergast.com](http://ergast.com/mrd/db/).
5. This now has filled your `f1db` with all Formula 1 historical data, so we will need to copy their data into our `myf1db` since we use a reduced set of their database design and a reduced set of the data. Copy the data into our `myf1db` by running the `DatabaseInitialDataTransferScript.sql`.
6. Your database is now caught up to the present. However, it won't stay that way long if we don't create a process which will keep our database synced with current race results.
7. If using MySql 8.0, you may encounter an issue with node being unable to access mysql. See [this StackOverflow post](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server) if having this error. 
8. The `Database/Syncing` project is a Node.js script will can be run by a Cron task on the development server or can be run manually.
9. You will need to create a file in the root folder called `dbConnectionConfig.js` which will have the NodeJS MySQL connection information. See the `sampleDbConnectionConfig.js` file for guidance. Mainly it just needs your MySQL login information.
10. If you choose to use cron, get this directory `Database/Syncing` onto a development machine which can run a Cron task, edit the bash script to match your directory path. In your Cron task editor (Ubuntu: `crontab -e`) add the following line `0 */2 * 3-11 0-1 /{your directory with}/cronscript.sh`
 - “At minute 0 past every 2nd hour on every Sunday and Monday in March through November.”
11. If not using Cron, run the `main.js` file repeatedly until your database is caught up. Each run of the script will only grab the next race results that your database needs, so it will need to be run until it does not insert again.

### API
1. `npm install` then `node API/bin/www` and the API should be listening

### Frontend
1. Run `ng serve` from within the `Frontend\frontend-probability-formula-one` directory.

### Championship Probabilities
The `DatabaseCreationScript.sql` run earlier has an extra table, `simulatedfinalstandings` which will hold a drivers probability of finishing in a given spot. This table is currently populated by running the `probability.js` file which runs a Monte Carlo simulation of the rest of the season to experimentally determine the probabilities for drivers finishing in a specific position.
