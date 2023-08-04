import { Then } from '@wdio/cucumber-framework';
import chai from 'chai';

Then(/^Inventory page should list (.*)$/, async (NumberOfProducts) => {
  if (!NumberOfProducts)
    throw Error(`Invalid number provided: ${NumberOfProducts}`);

  let eleArray = await $$('.inventory_item');
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

  let priceNumArr = priceStrArr.map((ele) => +ele.replace('$', ''));
  console.log(`>> price with $: ${priceNumArr}`);

  let InvalidPrice = priceNumArr.filter((ele) => ele <= 0);
  chai.expect(InvalidPrice.length).to.equal(0);
  /**3. Assert if any value is <=0 */
});
