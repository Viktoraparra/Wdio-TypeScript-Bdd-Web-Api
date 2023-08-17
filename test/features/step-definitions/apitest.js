import request from "supertest";

let pay = {
  grant_type: "password",
  client_id: "si_client",
  username: "dev-admin",
  password: "VerizonSI5G!",
};
let res = {};

(async function wava(baseURL, endpoint, payload) {
  res = await request(baseURL)
    .post(endpoint)
    .type("form")
    .set("content-Type", "application/x-www-form-urlencoded")
    .send(payload);
  // console.log(JSON.stringify(res));
  console.log(res.body.access_token);
})(
  "https://auth-op.dev.whereitsat.com",
  "/auth/realms/devlbdev/protocol/openid-connect/token",
  pay
);
