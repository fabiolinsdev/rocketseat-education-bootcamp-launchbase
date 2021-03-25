const { Pool } = require("pg")

module.exports =  new Pool({
    user: 'postgres',
    password: "wrf142536",
    host: "localhost",
    port: 5432,
    database: "launchstoredb"


})