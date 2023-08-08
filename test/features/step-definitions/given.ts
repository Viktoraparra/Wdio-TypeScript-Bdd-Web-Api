import { Given } from "@cucumber/cucumber";
import chai from "chai";
import reporter from "../../helper/reporter";
import constants from "../../../data/constant.json";
import apiHelper from "../../helper/apiHelper";
import fs from "fs";

Given(/^Login to inventory web app$/, async () => {
  /*1. Login to Inventory App*/
  // @ts-ignore
  await browser.url(browser.options.baseUrl);
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();

  let userNameField = await $('//input[@id="user-name"]');
  let passwordField = await $('//input[@id="password"]');
  let loginBtn = await $('//input[@id="login-button"]');
  // let containerDivError = await $(
  //   '//div[@class="error-message-container error"]'
  // );
  /* 2. Login to Inventory */
  console.log(`using env variables : ${process.env.TEST_STD_USERNAME}`);

  try {
    await userNameField.setValue("standard_user");
    await passwordField.setValue("secret_sauce");
    await loginBtn.click();
  } catch (error) {
    /** Implementing Refreshing method */
    console.log("Error in first login. Retrying..");
    await browser.refresh();
    await browser.pause(2000);
    await userNameField.setValue("standard_user");
    await passwordField.setValue("secret_sauce");
    await loginBtn.click();
  }

  //   await browser.isAlertOpen();

  //   await browser.acceptAlert();

  /**Login with another with reloading session*/
  // await browser.pause(2000);
  // await browser.reloadSession();
  // await userNameField.setValue('problem_user');
  // await passwordField.setValue('secret_sauce');
  // await loginBtn.click();

  // /** Navigating in browser back and for */
  // await browser.back();
  // await browser.pause(2000);
  // await browser.forward();

  await browser.debug();
});
/**
 * Get List of users from regres api
 * Sub-steps:
 * 1. Get payload data
 * 2. make get call by using API helper
 * 3. Store results
 */
Given(/^Get list of (.*) from (.*)$/, async (endpointRef) => {
  if (!endpointRef)
    throw Error(`Given enpoint ref: ${endpointRef} is not valid`);

  // reporter.addStep(
  //   this.testid,
  //   "info",
  //   `Getting the paylod data for endpoint: ${endpointRef}`
  // );

  try {
    let endpoint = "";
    if (endpointRef.trim().toUpperCase() === "USERS") {
      endpoint = constants.REQRES.GET_USERS;
    }
    if (!endpoint)
      throw Error(`Error getting endpoint: ${endpoint} from the constant.json`);

    // * 2. make get call by using API helper
    let testid = this.testid;
    let res;
    await browser.call(async function () {
      //@ts-ignore
      res = await apiHelper.GET(
        this.testid,
        browser.config.regresBaseURL,
        endpoint,
        "",
        constants.REQRES.QUERY_PARAM
      );
    });
    if (res.status !== 200)
      chai.expect.fail(
        `failed getting users from : ${browser.config.regresBaseUR}/${endpoint}`
      );
    reporter.addStep(
      this.testid,
      "debug",
      `API response received, data: ${JSON.stringify(res.body)}`
    );
    let data = JSON.stringify(res.body);
    let filename = `${process.cwd()}/data/api-rest/regresAPIUsers.json`;
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
