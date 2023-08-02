import { Given, When, Then } from '@wdio/cucumber-framework';
// const expectchai = require('chai').expect;
import chai from 'chai';

Given(/^Google page is opened$/, async () => {
  await browser.url('https://www.google.com');
  // await browser.pause(7000);
});

When(/^Search with (.*)$/, async (searchItem) => {
  console.log(`>>SearchItem: ${searchItem}`);
  let ele = await $('//*[@id="APjFqb"]');
  await ele.setValue(searchItem);
  await browser.keys('Enter');
});

Then(/^Click on the first search result$/, async () => {
  let ele = await $('<h3>');
  await ele.click();
});

Then(/^URL should match (.*)$/, async (ExpectedURL) => {
  console.log(`ExpectedURL: ${ExpectedURL}`);
  let url = await browser.getUrl();
  chai.expect(await url).to.be.equal(ExpectedURL);
});
