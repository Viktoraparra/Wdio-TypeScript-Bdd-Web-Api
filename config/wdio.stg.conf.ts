import { config as baseConfig } from "../wdio.conf.js";
export const config = Object.assign(baseConfig, {
  //All Test env specific key val pairs
  environment: "QA",
  baseUrl: "http://www.saucedemo.com",
  regresBaseURL: "http//regres.in",
  nopeCommerceBaseURL: "https://admin-demo.nopcommerce.com",
  authUrl: "",
  baseUrlAPI: "",
  adminToken: "",
  sqlConfig: {
    user: process.env.DB_STG_USER,
    password: process.env.DB_STG_PASSWORD,
    database: "nlndsjjnsdckjndskcjjnsdc",
    server: "DESKTOP-P4LNV65",
    options: {
      encrypt: false, // for azure
      trustServerCertificate: false, // change to true for local dev / self-signed certs
      trustedConnection: true,
    },
  },
});
