const express = require("express");
const app = express();
const axios = require("axios");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get(["/homepage", "/"], (req, res) => {
	res.render("homepage", { content: false, error: false });
});
app.post("/getContent", (req, res) => {
	axios
		.get(req.body.url)
		.then((response) => {
			let html = response.data;
			html = html.replace(/<style([\s\S]*?)<\/style>/gi, "");
			html = html.replace(/<script([\s\S]*?)<\/script>/gi, "");
			html = html.replace(/<\/div>/gi, "");
			html = html.replace(/<\/li>/gi, "");
			html = html.replace(/<li>/gi, "");
			html = html.replace(/<\/ul>/gi, "");
			html = html.replace(/<\/p>/gi, "");
			html = html.replace(/<br\s*[\/]?>/gi, "");
			html = html.replace(/<[^>]+>/gi, "");
			html = html.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "");
			res.render("homepage", { content: html, error: false });
		})
		.catch((err) => {
			res.render("homepage", { content: false, error: true });
		});
});

app.listen(3000, function () {
	console.log("Server started on port 3001");
});
