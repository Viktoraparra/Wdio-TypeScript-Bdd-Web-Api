import { When } from "@cucumber/cucumber";
import reporter from "../../helper/reporter.ts";
import nopcommerceHomepage from "../../page-objects/nopcommerce.home.page.ts";

When(/^An as (.*) user login to nopcommerce site$/, async (user) => {
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
