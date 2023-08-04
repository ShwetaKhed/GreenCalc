const { getConnection, sql } = require('./db');

async function testConnection() {
  try {
    // Establish the database connection
    await getConnection();

    // Execute a test query to check the connection
    const result = await sql.query`SELECT 1`;

    // Log the result
    console.log(result.recordset[0]['']);

    // Close the connection pool (important to release resources)
    await sql.close();
  } catch (err) {
    console.error('Error occurred during the test:', err);
  }
}

testConnection();
