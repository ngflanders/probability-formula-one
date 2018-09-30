# Probability Formula One
Modern formula one informational site featuring retrospective statistics.

## Development Setup
### Database
1. Create a MySQL database named `myf1db`.
3. Run the `Database/Design/TableCreationScript.sql` in your `myf1db` database.
3. Now we will clone some historical database to get our database caught up. [ergast.com](http://ergast.com/mrd/) provides an API to get historical data, or a clone of the database they use. They have a strict policy on frequency of API hits (4/sec and 200/hr), so it is better if our site runs on our own API rather than theirs. Download their MySQL database dump from [here](http://ergast.com/mrd/db/) and run it, so it inserts into your MySQL instance.
4. This now has created `f1db`, so we will need to copy their data into our `myf1db` since we use a reduced set of their database design and a reduced set of the data we need. Copy the data into our `myf1db` by running the `DatabaseInitialDataTransferScript.sql`.
5. Your database is now caught up to the present. However, it won't stay that way long if we don't create a process which will keep our database synced with current race results.
6. The `Database/Syncing` project is a Node.js script which will be run by a Cron task on the development server.
7. You will need to create a file in this folder called `dbConnectionConfig.js` which will have the NodeJS MySQL connection information. See the `sampleDbConnectionConfig.js` file for guidance. Mainly it just needs your MySQL login information.
8. Once you get this directory `Database/Syncing` onto a development machine which can run a Cron task, edit the bash script to match your directory path.
9. In your Cron task editor (Ubuntu: `crontab -e`) add the following line `0 */2 * 3-11 0-1 /{your directory with}/cronscript.sh`
 - “At minute 0 past every 2nd hour on every Sunday and Monday in March through November.”
