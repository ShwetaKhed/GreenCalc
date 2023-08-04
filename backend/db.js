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

/*
    //Use Azure VM Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-vm'
        },
        options: {
            encrypt: true
        }
    }

    //Use Azure App Service Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-app-service'
        },
        options: {
            encrypt: true
        }
    }
*/

console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        const result = await sql.query`SELECT TOP 1 * FROM Test`; // Replace YourTable with the actual table name

    // Log the first row of the result
    console.log(result.recordset[0]);

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}
