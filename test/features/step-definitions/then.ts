import { Then } from "@cucumber/cucumber";
import chai from "chai";
import logger from "../../helper/logger";
import reporter from "../../helper/reporter";
import fs from "fs";
import nopcommerceCustlistPage from "../../page-objects/nopcommerce.custlist.page";
import constants from "../../../data/constant.json" assert { type: "json" };

Then(/^Inventory page should list (.*)$/, async (NumberOfProducts) => {
  if (!NumberOfProducts)
    throw Error(`Invalid number provided: ${NumberOfProducts}`);

  let eleArray = await $$(".inventory_item");
  chai.expect(eleArray.length).to.equal(parseInt(NumberOfProducts));
});
/**
 * Steps:
 * 1. Get Price List
 * 2. Conver String to Number
 * 3. Assert if any value is <=0
 */

Then(/^Validate all products have valid price$/, async () => {
  // //div[@class="inventory_item"] reference to full div of products
  // //div[@class="inventory_item"]/div/a >> referencia imagen
  // //div[@class="inventory_item"]/div >> ambos divs
  // //div[@class="inventory_item"]/div/div >> referencia a div con texto links y botones
  // //div[@class="inventory_item"]/div/div/a >> reference to title of products
  // //div[@class="inventory_item"]/div/div/button button referente del div
  // //div[@class='inventory_item_price'] >> al precio

  //   * 1. Get Price List
  let pricesArray = await $$('//div[@class="inventory_item_price"]');
  let priceStrArr = [];
  for (let i = 0; i < pricesArray.length; i++) {
    let priceStr = await pricesArray[i].getText();
    priceStrArr.push(priceStr);
  }
  console.log(`>> price with $: ${priceStrArr}`);

  let priceNumArr = priceStrArr.map((ele) => +ele.replace("$", ""));
  console.log(`>> price with $: ${priceNumArr}`);

  let InvalidPrice = priceNumArr.filter((ele) => ele <= 0);
  chai.expect(InvalidPrice.length).to.equal(0);
  /**3. Assert if any value is <=0 */
});

Then(/^Verify if all users exist in customers list$/, async () => {
  try {
    /**1. Navigate/select Customer options from left menu*/
    // @ts-ignore
    await browser.url(
      `${browser.options.nopeCommerceBaseURL}/Admin/Customer/List`
    );
    reporter.addStep(
      this.testid,
      "info",
      `Navigated to customer list screen...`
    );

    /** 2. Read API response from /data folder*/
    let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`;
    let data = fs.readFileSync(filename, "utf8");
    let dataObj = JSON.parse(data);

    /**3. For each user object in API response */
    let numOfObj = dataObj.data.length;
    let arr = [];
    for (let i = 0; i < numOfObj; i++) {
      let obj = {};
      let firstname = dataObj.data[i].first_name;
      let lastname = dataObj.data[i].last_name;
      let custNotFound = await nopCommerceCustlistPage.searchNameAndConfirm(
        this.testid,
        firstname,
        lastname
      );
      if (custNotFound) {
        obj["firstname"] = firstname;
        obj["lastname"] = lastname;
        arr.push(obj);
      }
    }

    /**4. In case user does not exist write it to error file*/
    if (arr.length > 1) {
      let data = JSON.stringify(arr, undefined, 4);
      let filepath = `${process.cwd()}/results/custNotFoundList.json`;
      fs.writeFileSync(filepath, data);
    }
  } catch (err) {
    err.message = `${this.testid}: Failed at checking users in nopcommerce site, ${err.message}`;
    throw err;
  }
});
