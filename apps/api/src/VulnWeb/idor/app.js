const express = require("express");
const cookieSession = require("cookie-session");
const ejs = require("ejs");
const fs = require("fs");
const { v4 } = require("default-gateway");
const hostname = require("hostname");
const { stringify } = require("querystring");
const { request } = require("http");
const app = express();

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
	res.render("login", { isAdmin: false });
});

app.get("/logout", (req, res) => {
	req.session.user = "";
	res.redirect("/");
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
					res.render("homepage", { posts: posts, isAdmin: true, username: req.session.user });
				} else {
					res.render("homepage", { posts: posts, isAdmin: false, username: req.session.user });
				}
			}
		});
	} else {
		res.redirect("/login");
	}
});

app.post("/login", (req, res, next) => {
	fs.readFile("./data/users.json", "utf-8", (err, data) => {
		if (!err) {
			const users = JSON.parse(data);
			users.forEach((user) => {
				if (
					user.username === req.body.username &&
					user.password === req.body.password
				) {
					req.session.user = req.body.username;
					res.cookie("isAdmin", 0, {
						maxAge: 24 * 60 * 60 * 1000,
					});
					res.redirect("/homepage");
				}
			});
		} else {
			res.redirect("/login");
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
		res.redirect("/");
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

				if (req.body.author === "User2") {
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

				const newPost = {
					id: posts[posts.length - 1].id + 1,
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
		res.redirect("/");
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
					res.render("homepage", {
						posts: searchPosts,
						isAdmin: true,
					});
				} else {
					res.render("homepage", {
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
					if (
						post.id == req.params.postId &&
						post.author != req.session.user
					) {
						const gateway_ip = v4.sync().gateway;
						const name = hostname();
						const parameters = {
							containerId: name,
							numberSuccess: 2,
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
		res.redirect("/login");
	}
});

app.get("/users", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		if (req.headers.cookie.indexOf("isAdmin=1") > -1) {
			const gateway_ip = v4.sync().gateway;
			const name = hostname();
			const parameters = {
				containerId: name,
				numberSuccess: 3,
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
			return res.render("user",{ isAdmin: true });
		} else {
			return res.redirect("/");
		}
	} else {
		res.redirect("/login");
	}
});

app.get("/changePassword", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		res.render("changePassword", { isAdmin: false });
	} else {
		res.redirect("/login");
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
	}
	res.redirect("/");
});


app.listen(3000, function () {
	console.log("Server started on port 3000");
});
