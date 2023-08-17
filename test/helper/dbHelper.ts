import sql from "mssql";
import reporter from "././reporter.js";

/**
 * Executes given query
 * @param testid Global Id from Test Case
 * @param config configuration set for the construction of the DB
 * @param query query that will be executd are created in constant
 * @returns db result object
 */

async function executeQuery(testid: string, config, query: string) {
  // Truthy value check
  if (!query) throw Error(`Given query: ${query} is not valid`);
  reporter.addStep(testid, "info", "Executing the db query...");
  const pool1 = new sql.ConnectionPool(config);
  const pool1Connect = pool1.connect();
  pool1.on("error", (err) => {
    throw err;
  });
  await pool1Connect; // ensures that the pool has been created
  try {
    const request = pool1.request(); // or: new sql.Request(pool1)
    const result = await request.query(query);
    pool1.close();
    return result;
  } catch (err) {
    throw err;
  }
}
export default { executeQuery };
