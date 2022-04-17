const express = require("express");
const cookieSession = require("cookie-session");
const fs = require("fs");
const { v4 } = require("default-gateway");
const hostname = require("hostname");
const { stringify } = require("querystring");
const { request } = require("http");
const { Builder } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const { isUri } = require("valid-url");
const dotenv = require("dotenv");
const cookies = require("cookie-parser");

dotenv.config();

let step = 1;

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookies());

app.use(express.urlencoded({ extended: true }));

app.use(
	cookieSession({
		name: "session",
		keys: ["abc"],
		// Cookie Options
		maxAge: 24 * 60 * 60 * 1000, // 24 hours,
		httpOnly: false,
	})
);

app.use((req, res, next) => {
	res.locals.user = req.session.user;
	next();
});

app.get("/login", (req, res) => {
	return res.render("login");
});

app.get("/logout", (req, res) => {
	req.session.user = "";
	return res.redirect("/");
});

app.get("/posts", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		fs.readFile("./data/posts.json", "utf-8", (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);
				res.status(200).json({
					posts: posts,
				});
			}
		});
	} else {
		return res.redirect("/login");
	}
});

app.get(["/homepage", "/"], (req, res) => {
	if (
		req.cookies &&
		req.cookies.admin &&
		req.cookies.admin === process.env.COOKIE_ADMIN &&
		step === 1
	) {
		const gateway_ip = v4.sync().gateway;
		const name = hostname();
		const parameters = {
			containerId: name,
			numberSuccess: step,
		};
		const get_para = stringify(parameters);
		const options = {
			host: gateway_ip,
			port: 7000,
			path: "/api/v1/scores?" + get_para,
			method: "PATCH",
		};
		const req = request(options);
		step = step + 1;
		req.end();
	}
	if (req.session.user && req.session.user !== "") {
		return res.render("homepage");
	} else {
		return res.redirect("/login");
	}
});

app.post("/login", (req, res, next) => {
	fs.readFile("./data/users.json", "utf-8", (err, data) => {
		if (!err) {
			const users = JSON.parse(data);
			for (const user of users) {
				if (
					user.username === req.body.username &&
					user.password === req.body.password
				) {
					req.session.user = req.body.username;
					return res.redirect("/homepage?default=vietnam");
				}
			}
			return res.redirect("/login");
		} 
	});
});

app.post("/posts/:postId/comments", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		fs.readFile("./data/posts.json", "utf-8", (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);
				const newComment = {
					author: req.session.user,
					content: req.body.content,
				};
				for (let index = 0; index < posts.length; index++) {
					const post = posts[index];
					if (post.id == req.params.postId) {
						post.comments.push(newComment);
					}
				}
				fs.writeFileSync(
					"./data/posts.json",
					JSON.stringify(posts),
					"utf-8"
				);
			}
		});
		return res.redirect("/");
	} else {
		return res.redirect("/login");
	}
});

app.get("/report", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		return res.render("report");
	} else {
		return res.redirect("/login");
	}
});

app.post("/report", async (req, res) => {
	if (req.session.user && req.session.user !== "") {
		let url = req.body.content;
		if (isUri(url)) {
			const chromeOption = new Options();
			chromeOption.addArguments("--enable-javascript");
			const headers = req.headers.cookie.split(";");
			let session;
			let sessionSig;
			for (let index = 0; index < headers.length; index++) {
				const element = headers[index];
				if (
					element.indexOf("session") > -1 &&
					element.indexOf("session.sig") === -1
				) {
					session = element.slice(element.indexOf("=") + 1);
				}
				if (element.indexOf("session.sig") > -1) {
					sessionSig = element.slice(element.indexOf("=") + 1);
				}
			}
			const name = hostname();
			const driver = await new Builder()
				.forBrowser("chrome")
				.setChromeOptions(
					chromeOption.addArguments("--enable-javascript").headless().addArguments("--no-sandbox")
				)
				.build();
			let urlLogin = "https://" + name + ".kbklab.tech";
			await driver.get(urlLogin + "/login");
			await driver
				.manage()
				.addCookie({ name: "admin", value: process.env.COOKIE_ADMIN });
			await driver
				.manage()
				.addCookie({ name: "session", value: session });
			await driver
				.manage()
				.addCookie({ name: "session.sig", value: sessionSig });
			await driver.get(url);
			return res.render("report");
		} else {
			return res.render('report',{alert: "That is not a valid url"});
		}
	} else {
		return res.redirect("/login");
	}
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
