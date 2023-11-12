const sqlite3 = require('sqlite3')
const { AsyncDatabase } = require('promised-sqlite3')
const sql_statements = require('./sql')

const db = new AsyncDatabase(new sqlite3.Database(':memory:'));

(async () => {
    for (const statement of sql_statements) {
        await db.run(statement)
    }
})()

module.exports = db