const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: "pma.recruitment.alfasoft.pt",
  user: "josesantos-nodejs",
  password: "LaMkQNexDmkFQVx",
  database: "josesantos-nodejs",
  connectionLimit: 5
});

module.exports = pool