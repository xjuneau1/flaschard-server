const path = require("path")
require("dotenv").config()
const {DATABASE_URL} = process.env

module.exports = {

  development: {
    client: 'postgresql',
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
     directory: path.join(__dirname, "src", "db", "seeds")
    },
    pool: {
      min: 0,
      max: 40
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 0,
      max: 40
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
