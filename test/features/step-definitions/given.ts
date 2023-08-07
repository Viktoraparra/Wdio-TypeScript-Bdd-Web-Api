import { Given } from '@wdio/cucumber-framework';
import chai from 'chai';

Given(/^Login to inventory web app$/, async () => {
  /*1. Login to Inventory App*/
  // @ts-ignore
  await browser.url(browser.config.sauseDemoURL);
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();

  let userNameField = await $('//input[@id="user-name"]');
  let passwordField = await $('//input[@id="password"]');
  let loginBtn = await $('//input[@id="login-button"]');
  let containerDivError = await $(
    '//div[@class="error-message-container error"]'
  );
  /* 2. Login to Inventory */
  console.log(`using env variables : ${process.env.TEST_STD_USERNAME}`);

  try {
    await userNameField.setValue('standard_user');
    await passwordField.setValue('secret_sauce');
    await loginBtn.click();
  } catch (error) {
    /** Implementing Refreshing method */
    console.log('Error in first login. Retrying..');
    await browser.refresh();
    await browser.pause(2000);
    await userNameField.setValue('standard_user');
    await passwordField.setValue('secret_sauce');
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
