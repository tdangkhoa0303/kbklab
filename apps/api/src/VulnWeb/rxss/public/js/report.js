import {Builder} from "selenium-webdriver";
import {isUri} from "valid-url";

document
	.getElementById("btn-report")
	.addEventListener("click", async function () {
		const content = document.getElementById("report-content").value;
		const cookieValue = "admin=" + process.env.COOKIE_ADMIN;
		if (isUri(content)) {
			let driver = new Builder().forBrowser("chromium").build();
			driver.manage().addCookie(cookieValue);
			await driver.get(content);
		}
	});
