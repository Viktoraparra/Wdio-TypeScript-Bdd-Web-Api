import request from "supertest";
import reporter from "./reporter.js";

async function GET(
  testid: string,
  baseURL: string,
  endpoint: string,
  authToken: string
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
      .auth(authToken, { type: "bearer" })
      .set("Accept", "application/json, text/plain, */*")
      .timeout({
        response: 5000, // Wait 5 seconds for the server to start sending,
        deadline: 10000, // but allow 10 for the file to finish loading.
      })
      .expect(200);
  } catch (err: any) {
    err.message = `Error making a GET call to ${baseURL}${endpoint}, ${err}`;
    throw err;
  }
}

async function POST(
  testid: string,
  baseURL: string,
  endpoint: string,
  authToken: string,
  requestBody: object
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
      .type("form")
      .set("Authorization", "Bearer " + authToken)
      .set("content-type", "application/json")
      .set("User-Agent", "Insomnia/2023.5.2")
      .send(requestBody);
  } catch (err: any) {
    err.message = `Error making a POST call to ${endpoint}, ${err}`;
    throw err;
  }
}

async function POST_GET_TOKEN(
  testid: string,
  baseURL: string,
  endpoint: string,
  requestBody: object
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
      .type("form")
      .set("content-Type", "application/x-www-form-urlencoded")
      .send(requestBody);
  } catch (err: any) {
    err.message = `Error making a POST call to ${endpoint}, ${err}`;
    throw err;
  }
}

async function PUT(
  testid: string,
  putId: string,
  baseURL: string,
  endpoint: string,
  authToken: string,
  requestBody: object
) {
  try {
    if (!baseURL || !endpoint) {
      throw Error(
        `One of given values baseURL: ${baseURL}, endpoint: ${endpoint} are not valid`
      );
    }
    baseURL = baseURL.trim();
    endpoint = endpoint.trim();
    reporter.addStep(testid, "info", `Making a POST to ${baseURL}${endpoint}`);
    return await request(baseURL)
      .put(`${endpoint}/${putId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(requestBody);
  } catch (err: any) {
    err.message = `Error making a POST call to ${endpoint}, ${err}`;
    throw err;
  }
}

async function DELETE(
  testid: string,
  deleteId: string,
  baseURL: string,
  endpoint: string,
  authToken: string
) {
  if (!baseURL || !endpoint) {
    throw Error(
      `One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid`
    );
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  reporter.addStep(testid, "info", `Making a DELETE to ${endpoint}`);
  try {
    return await request(`${baseURL}${endpoint}`)
      .delete(deleteId)
      .auth(authToken, { type: "bearer" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
  } catch (err: any) {
    err.message = `Error making a DELETE call to ${endpoint}, ${err}`;
    throw err;
  }
}

export default { GET, POST, POST_GET_TOKEN, PUT, DELETE };
