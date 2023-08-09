import request from "supertest";
import reporter from "./reporter.js";

//What is request
// Example GET
// (async function GET() {
//   let res = await request("https://reqres.in/")
//     .get("api/users?page=2")
//     .query({})
//     .auth("", "")
//     .set("content-Type", "application/json")
//     .set("Accept", "application/json");
//   console.log(`>> Result: ${JSON.stringify(res)}`);
// })();

async function GET(
  testid: string,
  baseURL: string,
  endpoint: string,
  authToken: string,
  queryParam: object
) {
  if (!baseURL || !endpoint) {
    throw Error(
      `One of given values baseURL: ${baseURL}, endpoint: ${endpoint} are not valid`
    );
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  reporter.addStep(testid, "info", `Making a GET to ${endpoint}`);
  try {
    return await request(baseURL)
      .get(endpoint)
      .query(queryParam)
      .auth(authToken, { type: "bearer" })
      .set("content-Type", "application/json")
      .set("Accept", "application/json");
  } catch (error) {
    error.message = `Error making a GET call to ${endpoint}, ${error}`;
    throw error;
  }
}

async function POST(
  testid: string,
  baseURL: string,
  endpoint: string,
  authToken: string,
  payload: object
) {
  if (!baseURL || !endpoint) {
    throw Error(
      `One of given values baseURL: ${baseURL}, endpoint: ${endpoint} are not valid`
    );
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  reporter.addStep(testid, "info", `Making a POST to ${endpoint}`);
  try {
    return await request(baseURL)
      .post(endpoint)
      .auth(authToken, { type: "bearer" })
      .set("content-Type", "application/json")
      .set("Accept", "application/json")
      .send(payload);
  } catch (error) {
    error.message = `Error making a POST call to ${endpoint}, ${error}`;
    throw error;
  }
}

export default { GET, POST };
