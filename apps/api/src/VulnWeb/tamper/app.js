const express = require("express");
const cookieSession = require("cookie-session");
const ejs = require("ejs");
const fs = require("fs");
const dotenv = require("dotenv");
const { v4 } = require("default-gateway");
const hostname = require("hostname");
const { stringify } = require('querystring');
const { request } = require('http');

const app = express();
let step = 1;

dotenv.config();

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
	res.render("login");
});

app.get("/logout", (req, res) => {
	req.session.user = "";
	res.redirect("/");
});

app.get(["/homepage", "/"], (req, res) => {
	if (req.session.user && req.session.user !== "") {
		if (
			req.rawHeaders &&
			req.rawHeaders.indexOf("X-kbk-xyz") >= 0 &&
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
		fs.readFile("./data/posts.json", "utf-8", (err, data) => {
			if (!err) {
				let posts = JSON.parse(data);
				const postsExsist = [];
				for (let index = 0; index < posts.length; index++) {
					const post = posts[index];
					if (!post.isDeleted && post.id !== 10) {
						postsExsist.push(post);
					}
				}
				// posts = postsExsist.slice(1, 4);
				posts = postsExsist;
				return res.render("homepage", { posts: posts });
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
					req.session.user = req.body.username;
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
	}
});

app.post("/posts/search", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		fs.readFile("./data/posts.json", "utf-8", (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);
				let searchPosts = [];
				const postsExsist = [];
				for (let index = 0; index < posts.length; index++) {
					const post = posts[index];
					if (!post.isDeleted) {
						postsExsist.push(post);
					}
				}
				postsExsist.forEach((post) => {
					if (post.content.indexOf(req.body.content) >= 0) {
						searchPosts.push(post);
					}
				});
				return res.render("homepage", { posts: searchPosts });
			}
		});
	}
});

app.get("/posts/:postId", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		if (step === 2 && req.params.postId == 10) {
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
		fs.readFile("./data/posts.json", "utf-8", (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);
				for (let index = 0; index < posts.length; index++) {
					const post = posts[index];
					if (post.id == req.params.postId && !post.isDeleted) {
						return res.render("post", { post: post });
						// return;
					}
				}
			}
		});
	} 
	else return res.redirect("/");
});

app.get("/kbk/youfoundmysecretpath", (req, res) => {
	if (step === 3) {
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
	return res.redirect("/");
});

app.delete("/posts/:postId", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		if (step === 4) {
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
		fs.readFile("./data/posts.json", "utf-8", (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);
				let newPosts = [];
				for (let index = 0; index < posts.length; index++) {
					const post = posts[index];
					if (post.id !== req.params.postId) {
						newPosts.push(post);
					} else {
						post.isDeleted = true;
						newPosts.push(post);
					}
				}
				fs.writeFileSync(
					"./data/posts.json",
					JSON.stringify(newPosts),
					"utf-8"
				);
			}
		});
		return res.redirect("/");
	}
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});