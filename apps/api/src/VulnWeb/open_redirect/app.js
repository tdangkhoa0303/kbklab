const express = require("express");
const cookieSession = require("cookie-session");
const fs = require("fs");
const dotenv = require("dotenv");
const { isUri } = require("valid-url");
const { Builder } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const { v4 } = require("default-gateway");
const hostname = require("hostname");
const { stringify } = require("querystring");
const { request } = require("http");

const requestLogin = require("request");

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

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
	if (req.session.user && req.session.user !== "") {
		const url = req.query.redirect_url;
		if (!url) {
			return res.redirect("/homepage");
		} else {
			return res.redirect(url);
		}
	} else {
		return res.render("login");
	}
});

app.get("/logout", (req, res) => {
	req.session.user = "";
	return res.redirect("/login?redirect_url=/homepage");
});

app.get(["/homepage", "/"], (req, res) => {
	if (req.session.user && req.session.user !== "") {
		fs.readFile("./data/posts.json", "utf-8", (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);
				for (let index = 0; index < posts.length; index++) {
					const post = posts[index];
					if (post.author == req.session.user) {
						post.showDelete = true;
					} else {
						post.showDelete = false;
					}
				}
				return res.render("homepage", { posts: posts });
			}
		});
	} else {
		return res.redirect("/login?redirect_url=/homepage");
	}
});

app.post("/login", (req, res, next) => {
	fs.readFile("./data/users.json", "utf-8", (err, data) => {
		if (!err) {
			const users = JSON.parse(data);
			const url = req.query.redirect_url;
			users.forEach((user) => {
				if (
					user.username === req.body.username &&
					user.password === req.body.password
				) {
					req.session.user = req.body.username;
					if (!url) {
						return res.redirect("/homepage");
					} else {
						return res.redirect(url);
					}
				}
			});
		} else {
			return res.redirect("/login?redirect_url=/homepage");
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
		return res.redirect("/login?redirect_url=/homepage");
	}
});

app.get("/posts/search", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		fs.readFile("./data/posts.json", "utf-8", (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);
				for (let index = 0; index < posts.length; index++) {
					const post = posts[index];
					if (post.author == req.session.user) {
						post.showDelete = true;
					} else {
						post.showDelete = false;
					}
				}
				let searchPosts = [];

				posts.forEach((post) => {
					if (post.content.indexOf(req.query.content) >= 0) {
						searchPosts.push(post);
					}
				});
				return res.render("homepage", {
					posts: searchPosts,
					notify: req.query.content,
				});
			}
		});
	} else {
		return res.redirect("/login?redirect_url=/homepage");
	}
});

app.get("/report", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		return res.render("report");
	} else {
		return res.redirect("/login?redirect_url=/homepage");
	}
});

app.post("/report", async (req, res) => {
	if (req.session.user && req.session.user !== "") {
		let password = "";
		const username = "User2";
		fs.readFile("./data/users.json", "utf-8", (err, data) => {
			if (!err) {
				const users = JSON.parse(data);
				for (const user of users) {
					if (user.username === username) {
						password = user.password;
					}
				}
				let url = req.body.content;
				if (isUri(url) && url.includes("redirect_url")) {
					const name = hostname();
					const urlLogin = "https://" + name + ".kbklab.tech/login";
					requestLogin.post(
						{
							headers: {
								"content-type":
									"application/x-www-form-urlencoded",
							},
							url: urlLogin,
							body:
								"username=" +
								username +
								"&password=" +
								password,
						},
						async function (error, response, body) {
							var headers = response.headers;
							const cookies = headers["set-cookie"];
							let session;
							let sessionSig;
							for (const cookie of cookies) {
								const types = cookie.split(";");
								if (types[0].indexOf("session.sig") > -1) {
									sessionSig = types[0].slice(
										types[0].indexOf("=") + 1
									);
								} else if (types[0].indexOf("session") > -1) {
									session = types[0].slice(
										types[0].indexOf("=") + 1
									);
								}
							}
							const chromeOption = new Options();
							chromeOption.addArguments("--enable-javascript");
							const driver = await new Builder()
								.forBrowser("chrome")
								.setChromeOptions(
									chromeOption
										.addArguments("--enable-javascript")
										.headless().addArguments("--no-sandbox")
								)
								.build();
							await driver.get(urlLogin);
							await driver
								.manage()
								.addCookie({ name: "session", value: session });
							await driver.manage().addCookie({
								name: "session.sig",
								value: sessionSig,
							});
							await driver.get(url);
							return res.render("report");
						}
					);
				} else {
					return res.redirect("/login?redirect_url=/homepage");
				}
			}
		});
	}
});

app.get("/posts/deletePost/:postId", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		fs.readFile("./data/posts.json", "utf-8", (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);
				const savePosts = [];
				for (let index = 0; index < posts.length; index++) {
					const post = posts[index];
					if (
						post.id != req.params.postId ||
						req.session.user !== post.author
					) {
						savePosts.push(post);
					}
					if (
						post.id == req.params.postId &&
						req.session.user == "User2"
					) {
						const gateway_ip = v4.sync().gateway;
						const name = hostname();
						const parameters = {
							containerId: name,
							numberSuccess: 1,
						};
						const get_para = stringify(parameters);
						const options = {
							host: gateway_ip,
							port: 7000,
							path: "/api/v1/scores?" + get_para,
							method: "PATCH",
						};
						const req = request(options);
						req.end();
					}
				}
				fs.writeFileSync(
					"./data/posts.json",
					JSON.stringify(savePosts),
					"utf-8"
				);
				res.redirect("/");
			}
		});
	} else {
		return res.redirect("/login?redirect_url=/homepage");
	}
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
