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
const requestLogin = require("request");

const app = express();

let step = 1;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(
	cookieSession({
		name: "session",
		keys: ["abc"],
		// Cookie Options
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	})
);

app.use((req, res, next) => {
	res.locals.user = req.session.user;
	next();
});

app.get("/login", (req, res) => {
	return res.render("login", { isAdmin: false });
});

app.get("/logout", (req, res) => {
	req.session.user = "";
	return res.redirect("/");
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
				if (req.headers.cookie.indexOf("isAdmin=1") > -1) {
					return res.render("homepage", {
						posts: posts,
						isAdmin: true,
					});
				} else {
					return res.render("homepage", {
						posts: posts,
						isAdmin: false,
					});
				}
			}
		});
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
					if (
						req.body.username === "User2" &&
						step === 1 &&
						!req.body.isBackend
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
						req.end();
					}
					req.session.user = req.body.username;
					res.cookie("isAdmin", 0, {
						maxAge: 24 * 60 * 60 * 1000,
					});
					return res.redirect("/homepage");
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

app.post("/posts", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		fs.readFile("./data/posts.json", "utf-8", (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);

				if (!req.body.author) {
					req.body.author = req.session.user;
				}

				const id =
					posts.length === 0 ? 1 : posts[posts.length - 1].id + 1;

				const newPost = {
					id: id,
					author: req.body.author,
					title: req.body.newTitle,
					content: req.body.newContent,
					comments: [],
				};
				posts.push(newPost);
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

app.post("/posts/search", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		fs.readFile("./data/posts.json", "utf-8", (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);
				let searchPosts = [];
				posts.forEach((post) => {
					if (post.content.indexOf(req.body.content) >= 0) {
						if (post.author == req.session.user) {
							post.showDelete = true;
						} else {
							post.showDelete = false;
						}
						searchPosts.push(post);
					}
				});

				if (req.headers.cookie.indexOf("isAdmin=1") > -1) {
					return res.render("homepage", {
						posts: searchPosts,
						isAdmin: true,
					});
				} else {
					return res.render("homepage", {
						posts: searchPosts,
						isAdmin: false,
					});
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
					if (post.id != req.params.postId) {
						savePosts.push(post);
					}
				}
				fs.writeFileSync(
					"./data/posts.json",
					JSON.stringify(savePosts),
					"utf-8"
				);
				return res.redirect("/");
			}
		});
	} else {
		return res.redirect("/login");
	}
});

app.get("/users", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		if (req.headers.cookie.indexOf("isAdmin=1") > -1) {
			return res.render("user");
		} else {
			return res.redirect("/");
		}
	} else {
		return res.redirect("/login");
	}
});

app.get("/changePassword", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		return res.render("changePassword", { isAdmin: false });
	} else {
		return res.redirect("/login");
	}
});

app.post("/changePassword", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		fs.readFile("./data/users.json", "utf-8", (err, data) => {
			if (!err) {
				const users = JSON.parse(data);

				for (let index = 0; index < users.length; index++) {
					const user = users[index];
					if (user.username == req.session.user) {
						user.password = req.body.newPassword;
					}
				}
				fs.writeFileSync(
					"./data/users.json",
					JSON.stringify(users),
					"utf-8"
				);
			}
		});
		return res.redirect("/");
	} else {
		return res.redirect("/login");
	}
});

app.get("/report", async (req, res) => {
	if (req.session.user && req.session.user !== "") {
		return res.render("report");
	} else {
		return res.redirect("/login");
	}
});

app.post("/report", async (req, res) => {
	if (req.session.user && req.session.user !== "") {
		const username = "User2";
		fs.readFile("./data/users.json", "utf-8", (err, data) => {
			if (!err) {
				let password;
				const users = JSON.parse(data);
				users.forEach((user) => {
					if (user.username === username) {
						password = user.password;
					}
				});
				let url = req.body.content;
				if (isUri(url)) {
					const name = hostname();
					const urlLogin = "https://" + name + ".kbklab.tech/login";
					// const urlLogin = 'http://localhost:3000/login'
					requestLogin.post({
						headers: {
							"content-type": "application/x-www-form-urlencoded",
						},
						url: urlLogin,
						body:
							"username=" +
							username +
							"&password=" +
							password +
							"&isBackend=true",
					},async function (error, response, body) {
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
								session = types[0].slice(types[0].indexOf("=") + 1);
							}
						}
						const chromeOption = new Options();
						chromeOption.addArguments("--enable-javascript");
						const driver = await new Builder()
							.forBrowser("chrome")
							.setChromeOptions(
								chromeOption
									.addArguments("--enable-javascript")
									.headless().addArguments('--no-sandbox')
							)
							.build();
						await driver.get(urlLogin);
						await driver
							.manage()
							.addCookie({ name: "session", value: session });
						await driver
							.manage()
							.addCookie({ name: "session.sig", value: sessionSig });
						await driver.get(url);
						return res.render("report");
				}
			);
				}
			}
		});
	} else {
		return res.redirect("/login");
	}
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
