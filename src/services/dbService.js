const fs = require('fs');
const path = require('path');
const dbFile = path.join(__dirname, '../../db.json');

function readDB() {
  return new Promise((resolve, reject) => {
    fs.readFile(dbFile, 'utf-8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

function writeDB(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbFile, JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = { readDB, writeDB };
