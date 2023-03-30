/* eslint-disable camelcase */
require('dotenv').config();
exports.up = async (pgm) => {
  await pgm.sql(`
    CREATE TABLE customers (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL,
      password VARCHAR(50) NOT NULL,
      documents VARCHAR(11) NOT NULL,
      phone VARCHAR(11)
    );
  `);
};

exports.down = async (pgm) => {
  await pgm.sql(`DROP TABLE customers;`);
};