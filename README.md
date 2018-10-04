# Probability Formula One
Modern formula one informational site featuring retrospective statistics.

## Development Setup
### Database
1. Download MySQL server and get it set up.
3. Run the `Database/Design/DatabaseCreationScript.sql` which will create a `myf1db` database and tables.
3. Now we will clone some historical data to get our database caught up. [ergast.com](http://ergast.com/mrd/) provides an API to get historical data, or a clone of the database they use. They have a strict policy on frequency of API hits (4/sec and 200/hr), so it is better if our site runs on our own API rather than use theirs. Download their MySQL database dump from [here](http://ergast.com/mrd/db/). 4. In your MySQL server, `create` and `use` a new database `f1db`. Run the `f1db.sql` that you downloaded from [ergast.com](http://ergast.com/mrd/db/).
5. This now has filled your `f1db` with all Formula 1 historical data, so we will need to copy their data into our `myf1db` since we use a reduced set of their database design and a reduced set of the data. Copy the data into our `myf1db` by running the `DatabaseInitialDataTransferScript.sql`.
6. Your database is now caught up to the present. However, it won't stay that way long if we don't create a process which will keep our database synced with current race results.
7. The `Database/Syncing` project is a Node.js script which will be run by a Cron task on the development server.
8. You will need to create a file in this folder called `dbConnectionConfig.js` which will have the NodeJS MySQL connection information. See the `sampleDbConnectionConfig.js` file for guidance. Mainly it just needs your MySQL login information.
9. Once you get this directory `Database/Syncing` onto a development machine which can run a Cron task, edit the bash script to match your directory path.
10. In your Cron task editor (Ubuntu: `crontab -e`) add the following line `0 */2 * 3-11 0-1 /{your directory with}/cronscript.sh`
 - “At minute 0 past every 2nd hour on every Sunday and Monday in March through November.”
