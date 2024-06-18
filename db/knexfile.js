const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env'),override:true });

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.DB_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
