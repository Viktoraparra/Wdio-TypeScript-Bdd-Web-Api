import { Then } from '@wdio/cucumber-framework';
import chai from 'chai';

Then(/^Inventory page should list (.*)$/, async (NumberOfProducts) => {
  if (!NumberOfProducts)
    throw Error(`Invalid number provided: ${NumberOfProducts}`);

  // //div[@class="inventory_item"] reference to full div of products
  // //div[@class="inventory_item"]/div/a >> referencia imagen
  // //div[@class="inventory_item"]/div >> ambos divs
  // //div[@class="inventory_item"]/div/div >> referencia a div con texto links y botones
  // //div[@class="inventory_item"]/div/div/a >> reference to title of products
  // //div[@class="inventory_item"]/div/div/button button referente del div
  // //div[@class='inventory_item_price'] >> al precio

  let eleArray = await $$('.inventory_item');
  chai.expect(eleArray.length).to.equal(parseInt(NumberOfProducts));
});
