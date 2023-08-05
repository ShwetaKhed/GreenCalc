const sql = require('mssql');

const config = {
    user: 'rtik0001', // better stored in an app setting such as process.env.DB_USER
    password: 'Mavericks1!', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'ta04emissions.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'TA04', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}



console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        const result = await sql.query`SELECT TOP 1 * FROM Test`;
        console.log(result);
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}
