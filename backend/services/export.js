const fs = require('fs');
const { EOL } = require('os');
const sql_statements = require('./sql')

const [export_dir] = [...process.argv.slice(2), 'build'];

function export_sql_statements() {
    if (!fs.existsSync(export_dir)) {
        fs.mkdirSync(export_dir, { recursive: true })
    }

    fs.writeFile(`${export_dir}/db.sql`,
        sql_statements.map(statement => `${statement};`).join(EOL),
        err => { if (err) { console.error(err); } })
};

export_sql_statements();
