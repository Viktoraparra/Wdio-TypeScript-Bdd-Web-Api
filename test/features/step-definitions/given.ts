import { Given } from '@wdio/cucumber-framework';
import chai from 'chai';

Given(/^Login to inventory web app$/, async () => {
  /*1. Login to Inventory App*/
  await browser.url('http://saucedemo.com');
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();

  let userNameField = await $('#user-name');
  let passwordField = await $('#password');
  let loginBtn = await $('//input[@id="login-button"]');
  let containerDivError = await $(
    '//div[@class="error-message-container error"]'
  );
  /* 2. Login to Inventory */
  await userNameField.setValue('standard_user');
  await passwordField.setValue('secret_sauce');
  await loginBtn.click();

  await browser.isAlertOpen();

  await browser.acceptAlert();
});
