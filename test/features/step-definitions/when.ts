import { When } from "@cucumber/cucumber";
import reporter from "../../helper/reporter.ts";
import nopcommerceHomepage from "../../page-objects/nopcommerce.home.page.ts";

When(/^An as (.*) user login to nopcommerce site$/, async function (user) {
  if (!user) throw Error(`Given user: ${user} is not valid`);
  user = user.trim().toUpperCase();
  try {
    reporter.addStep(this.testid, "info", "Login to nopcommerce demo site...");
    await nopcommerceHomepage.loginTonopCommerceWeb(
      this.testid,
      //@ts-ignore
      browser.options.nopeCommerceBaseURL,
      process.env[`QA_NOP_${user}_USERNAME`],
      process.env[`QA_NOP_${user}_PASSWORD`]
    );
  } catch (err) {
    err.message = `${this.testid}: Failed at nopcommerce login step, ${err.message}`;
    throw err;
  }
});

When(/^Search users in customers list$/, async () => {});

When(/^Perfom web interactions with inputs$/, async () => {
  let textField = await $('//input[@type="number"]');
  await textField.setValue("12345");

  await textField.clearValue();

  textField.click();
  let num = 67890;
  let strNum = num.toString();

  for (let i = 0; i < strNum.length; i++) {
    let charStr = strNum.charAt(i);
    await browser.pause(1000);
    await browser.keys(charStr);
  }
});

When(/^Perfom web interactions with Dropdown$/, async () => {
  // Select by attribute, text or index
  let dropdownField = await $('//select[@id="dropdown"]');
  await dropdownField.selectByAttribute("value", "1");

  await dropdownField.selectByVisibleText("Option 2");

  await dropdownField.selectByIndex(1);

  let arrayDropdownEle = await $$("//select/option");
  for (let i = 0; i < arrayDropdownEle.length; i++) {
    let ele = arrayDropdownEle[i];
    console.log(await ele.getText());
  }
});

When(/^Perfom web interactions with Checkboxes$/, async () => {
  let checkbox1Ele = await $('//form[@id="checkboxes"]/input[1]');
  let checkbox2Ele = await $('//form[@id="checkboxes"]/input[2]');

  await checkbox1Ele.click();
  let validate = await checkbox1Ele.isSelected();
  if (await checkbox2Ele.isSelected) {
    await checkbox2Ele.click();
  }
  chai.expect(validate).to.be.true;
  let checkboxes = await $('//form[@id="checkboxes"]');
});

When(/^Perfom web interactions with Multiple Windows$/, async () => {
  /*
  Windows Handling 
  Steps:
  1. launch the browser
  2. open another windows
  3. switch to the window based on title
  4. switch back to the main windows

  methods
  1. getTitle()
  2. getWindowHandle()
  3. getWindowHandles()
  4. SwitchToWindow()
  */

  //2. open another windows
  let clickText = await $('//a[contains(text(),"Click Here")]');
  let hyperLink = await $('//a[@href="http://elementalselenium.com/"]');

  await clickText.click();
  await hyperLink.click();
  let currentWinTitle = await browser.getTitle();
  let parentWinHandle = await browser.getWindowHandle();

  console.log(`>> currentWinTitle: ${currentWinTitle}`);

  //3. switch to the Specific window
  let windowHandle = await browser.getWindowHandles();
  for (let i = 0; i < windowHandle.length; i++) {
    console.log(`>> Win Handle: ${windowHandle[i]}`);
    await browser.switchToWindow(windowHandle[i]);
    currentWinTitle = await browser.getTitle();
    if (currentWinTitle === "Elemental Selenium | Elemental Selenium") {
      await browser.switchToWindow(windowHandle[i]);
      let header3Text = (await $("<h1>")).getText();
      console.log(`>> header Text Selected: ${header3Text}`);

      break;
    }
  }

  // switch back to the main windows
  await browser.switchToWindow(parentWinHandle);
  let mainTitle = await $("<h3>");
  console.log(await mainTitle.getText());

  chai.expect(await mainTitle).to.be.equal("Opening a new window");
});

When(/^Perfom web interactions with Browsers alerts$/, async () => {
  /*
  Handling Alerts
  methods used
  1.  isAlertOpen()
  2.  acceptAlert()
  3.  dismissAlert()
  4.  getAlertText()
  5.  sendAlerText()
*/
  (await $('//button[@onClick="jsAlert()"]')).click();
  if (await browser.isAlertOpen()) {
    let text = await browser.getAlertText();
    console.log(text);
    await browser.dismissAlert();
  }
  (await $('//button[@onClick="jsAlert()"]')).click();
  if (await browser.isAlertOpen()) {
    let text = await browser.getAlertText();
    console.log(text);
    await browser.acceptAlert();
  }
  (await $('//button[@onClick="jsPrompt()"]')).click();
  if (await browser.isAlertOpen()) {
    let text = await browser.getAlertText();
    await browser.sendAlertText("Mi Name is Victor");
    console.log(text);
    await browser.acceptAlert();
  }

  /*
for and a basic auth alert always is important to send the email and the 
password in the url 
ex: https://user:password@the-internet.herokuapp.com/

by this way is possible to bypass the basic authentication
*/
});

When(/^Perfom web interactions with FileUpload$/, async () => {
  /**
   * 5. File Upload
   */
  await $('//input[@id="file-upload"]').addValue(
    `${process.cwd()}/data/dummy.txt`
  );
  await $('//input[@id="file-submit"]').click();
});

When(/^Perfom web interactions with Frames$/, async () => {
  let linkFrames = await $('//a[@href="/iframe"]');
  await linkFrames.click();

  // Switching to Iframe
  let iframeElement = await $('//iframe[@id="mce_0_ifr"]');
  await browser.switchToFrame(iframeElement);

  let bodyField = await $("#tinymce");
  await bodyField.clearValue();
  await bodyField.addValue("This is a text inputing text in Iframe!!!");

  // this is for returning to parent Frame
  await browser.switchToParentFrame();
});

When(/^Perfom web interactions with keypress actions$/, async () => {
  let linkFrames = await $('//a[@href="/iframe"]');
  await linkFrames.click();

  // Switching to Iframe
  let iframeElement = await $('//iframe[@id="mce_0_ifr"]');
  await browser.switchToFrame(iframeElement);

  let bodyField = await $("#tinymce");
  await bodyField.clearValue();

  //Performing Ctrl + A (Ctrl = Meta)
  await browser.keys(["Command", "A"]);

  await browser.keys("Delete");
});

When(/^Perfom web interactions with web Tables$/, async () => {
  /** 1.  Check number of rows and columns */
  let rowCount = await $$('//table[@id="table1"]/tbody/tr').length;
  chai.expect(rowCount).to.be.equal(4);
  let columCount = (await $$('//table[@id="table1"]/thead/tr/th')).length;
  chai.expect(columCount).to.be.equal(6);

  /** 2. Get whole table data*/
  // //table[@id="table1"]/tbody/tr[1]/td[2]
  let arrPersons = [];
  for (let i = 0; i < rowCount; i++) {
    let personObj = {
      lastName: "",
      firstName: "",
      email: "",
      due: "",
      web: "",
    };

    /**3. Get all Row */
    for (let j = 0; j < columCount; j++) {
      let cellValue = await $(
        `//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`
      );
      console.log(`>> Cell Value: ${await cellValue.getText()}`);
      if (j === 0) personObj.lastName = await cellValue.getText();
      if (j === 1) personObj.firstName = await cellValue.getText();
      if (j === 2) personObj.email = await cellValue.getText();
      if (j === 3) personObj.due = await cellValue.getText();
      if (j === 4) personObj.web = await cellValue.getText();
    }
    arrPersons.push(personObj);
  }
  console.log(JSON.stringify(arrPersons));

  /**4. Get single row {Based on a condition} */
  let arrPersons2 = [];
  for (let i = 0; i < rowCount; i++) {
    let personObj = {
      lastName: "",
      firstName: "",
      email: "",
      due: "",
      web: "",
    };
    for (let j = 0; j < columCount; j++) {
      let cellValue = await $(
        `//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`
      );
      let firstName = await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[2]`);
      if ((await firstName.getText()) === "Jason") {
        if (j === 0) personObj.lastName = await cellValue.getText();
        if (j === 1) personObj.firstName = await cellValue.getText();
        if (j === 2) personObj.email = await cellValue.getText();
        if (j === 3) personObj.due = await cellValue.getText();
        if (j === 4) personObj.web = await cellValue.getText();
      }
    }
    if (personObj.firstName) {
      arrPersons2.push(personObj);
    }
  }
  /**
   * 5. Get a Single cell Value {based fron another cell}
   */
  let arrNew = [];
  for (let i = 0; i < rowCount; i++) {
    let price = await $(
      `//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`
    ).getText();
    let firstName = (
      await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[2]`)
    ).getText();
    if (+price.replace("$", "") > 50) {
      arrNew.push(firstName);
    }
  }
  console.log(JSON.stringify(arrNew));
});
