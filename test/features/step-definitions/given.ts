import { Given } from "@cucumber/cucumber";
// import chai, { assert } from "chai";
import reporter from "../../helper/reporter.js";
import constants from "../../../data/constant.json" assert { type: "json" };
import apiHelper from "../../helper/apiHelper.js";
import sauseHomePage from "../../page-objects/sause.home.page.js";
import fs from "fs";

Given(
  /^As (a|an) (.*) user I login to inventory web app$/,
  async function (prefixTxt, userType, dataTable) {
    try {
      reporter.addStep(this.testid, "info", "Login to sause demo..");
      // let dt = dataTable.hashes();
      // @ts-ignore
      await sauseHomePage.navigateTo(browser.options.sauseDemoURL);
      await sauseHomePage.loginToSauseApp(
        this.testid,
        process.env.TEST_STD_USERNAME,
        process.env.TEST_STD_PASSWORD
      );
    } catch (err) {
      err.message = `${this.testid}: Failed at login step, ${err.message}`;
      throw err;
    }
  }
);

Given(/^A web page is opened in (.*)$/, async (text) => {
  await browser.url("https://the-internet.herokuapp.com/");
  await browser.setTimeout({ implicit: 2000, pageLoad: 2000 });
  await browser.maximizeWindow();

  let inputTextLink = await $(`//a[contains(text(),"${text}")]`);

  await inputTextLink.scrollIntoView();
  await browser.pause(1000);
  await inputTextLink.click();
  await browser.pause(1000);
});

Given(/^Get list of (.*) from reqres.in$/, async function (endpointRef) {
  if (!endpointRef)
    throw Error(`Given endpoint ref: ${endpointRef} is not valid`);

  try {
    /** 1. Get payload data*/
    reporter.addStep(
      this.testid,
      "info",
      `Getting the payload data for endpoint: ${endpointRef}`
    );
    let endpoint = "";
    if (endpointRef.trim().toUpperCase() === "USERS") {
      endpoint = constants.REQRES.GET_USERS;
    }
    if (!endpoint)
      throw Error(`Error getting endpoint:${endpoint} from the constants.json`);

    /**2. Make get call by using API helper */
    let testid = this.testid;
    let res;
    await browser.call(async function () {
      // @ts-ignore
      res = await apiHelper.GET(
        testid,
        browser.options.reqresBaseURL,
        endpoint,
        "",
        constants.REQRES.QUERY_PARAM
      );
    });
    // @ts-ignore
    if (res.status !== 200)
      chai.expect.fail(
        `Failed getting users from :${browser.options.reqresBaseURL}/${endpoint}`
      );
    reporter.addStep(
      this.testid,
      "debug",
      `API response received, data: ${JSON.stringify(res.body)}`
    );

    /** 3.Store results*/
    let data = JSON.stringify(res.body, undefined, 4);
    let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`;
    fs.writeFileSync(filename, data);
    reporter.addStep(
      this.testid,
      "info",
      `API response from ${endpoint} stored in json file`
    );
  } catch (err) {
    err.message = `${this.testid}: Failed at getting API users from reqres, ${err.message}`;
    throw err;
  }
});

Given(
  /^Tenant with (.*) get bearer token with (.*) and (.*)$/,
  async function (endpointRef, clientId, user, pass) {
    // if (!endpointRef)
    //   throw Error(`Given endpoint ref: ${endpointRef} is not valid`);

    try {
      reporter.addStep(
        this.testid,
        "info",
        `Getting the payload data for endpoint: ${endpointRef}`
      );

      let endpoint = "";
      if (endpointRef.trim().toUpperCase() === "USERS") {
        endpoint = constants.POSTS.TOKEN;
      }
      if (!endpoint)
        throw Error(
          `Error getting endpoint:${endpoint} from the constants.json`
        );

      let testid = this.testid;
      let payload = {
        grant_type: "password",
        client_id: clientId,
        username: user,
        password: pass,
      };

      await browser.call(async function () {
        // @ts-ignore
        res = await apiHelper.POST_GET_TOKEN(
          testid,
          browser.options.baseUrlAPI,
          endpoint,
          payload
        );
        // @ts-ignore
        if (res.status !== 200)
          chai.expect.fail(
            `Failed getting users from :${browser.options.baseUrl}/${endpoint}`
          );
        reporter.addStep(
          this.testid,
          "debug",
          `API response received, data: ${JSON.stringify(
            res.body.access_token
          )}`
        );
        console.log(res.body);
        let data = JSON.stringify(res.body, undefined, 4);
        console.log(data);
        let filename = `${process.cwd()}/data/api-response/AdminToken.json`;
        fs.writeFileSync(filename, data);
        reporter.addStep(
          this.testid,
          "info",
          `API response from ${endpoint} stored in json file`
        );
      });
    } catch (error) {
      err.message = `${this.testid}: Failed at getting bearer Token for Admin User, ${err.message}`;
      throw err;
    }
  }
);
