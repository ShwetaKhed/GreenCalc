const sql = require('mssql');

const config = {
    user: 'rtik0001',
    password: 'Mavericks1!',
    server: 'ta04emissions.database.windows.net',
    port: 1433,
    database: 'TA04',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

connectAndQuery();

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        const result = await sql.query`SELECT  * FROM emissions_vf`;
        console.log(result.recordset.length);
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}
