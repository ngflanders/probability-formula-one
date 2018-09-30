const http = require('http');

function fetch(year, round, endpoint) {
  return new Promise(function (resolve, reject) {
    http.get(`http://ergast.com/api/f1/${year}/${round}/${endpoint}.json`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        resolve(JSON.parse(data).MRData);
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = {fetch};