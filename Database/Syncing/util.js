function getDateTime() {
  let date = new Date();
  let hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
  let min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  let sec = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
  let month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  let day = (date.getDate() < 10 ? "0" : "") + date.getDate();
  return month + "/" + day + "/" + date.getFullYear() + " " + hour + ":" + min + ":" + sec;
}

function noResults(table, raceInfoObj) {
  console.log(`${getDateTime()} - No ${table} yet for Season: ${raceInfoObj.season} Race: ${raceInfoObj.round}`)
}

module.exports = {getDateTime, noResults};