const { Builder } = require("selenium-webdriver");

async function example() {
	let driver = await new Builder().forBrowser("chrome").build();
	await driver.get("http://google.com");
}
example();
