const express = require("express");
const cookieSession = require("cookie-session");
const fs = require("fs");
const dotenv = require("dotenv");
const { v4 } = require("default-gateway");
const hostname = require("hostname");
const { stringify } = require("querystring");
const { request } = require("http");

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
	return res.render("login");
});

app.get("/logout", (req, res) => {
	req.session.user = "";
	return res.redirect("/");
});

app.get(["/homepage", "/"], (req, res) => {
	if (req.session.user && req.session.user !== "") {
		if (req.query.content && req.query.content !== 'posts.json') {
			fs.readFile("./data/"+req.query.content, "utf-8", (err, data) => {
				return res.render("homepage", { posts: data, isPost: false });
			});
		} else {
			fs.readFile("./data/posts.json", "utf-8", (err, data) => {
				if (!err) {
					const posts = JSON.parse(data);
					return res.render("homepage", { posts: posts });
				}
			});
		}
	} else {
		return res.redirect("/login");
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
					if (user.username === 'User2') {
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
					req.session.user = req.body.username;
					return res.redirect("/homepage?content=posts.json");
				}
			});
		} else {
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

app.get("/posts/search", (req, res) => {
	if (req.session.user && req.session.user !== "") {
		fs.readFile("./data/posts.json", "utf-8", (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);
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
		return res.redirect("/login");
	}
});


app.listen(3000, function () {
	console.log("Server started on port 3000");
});
