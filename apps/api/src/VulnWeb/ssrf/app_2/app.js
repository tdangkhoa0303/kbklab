const express = require("express");
const cookieSession = require("cookie-session");
const { v4 } = require("default-gateway");
const hostname = require("hostname");
const querystring = require("querystring");
const http = require("http");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use("/robots.txt", function (req, res, next) {
	res.type("text/plain");
	res.send("User-agent: *\nDisallow: /kbklab");
});

app.get("/robots.txt", function (req, res) {
	res.type("text/plain");
	res.send("User-agent: *\nDisallow: /kbklab");
});

app.get(["/homepage", "/"], (req, res) => {
	res.render("homepage");
});

app.get("/kbklab", (req, res) => {
	const gateway_ip = v4.sync().gateway;
	const name = hostname();
	const parameters = {
		containerId: name,
		numberSuccess: 1,
	};
	const get_para = new URLSearchParams(parameters).toString();
	const options = {
		host: gateway_ip,
		port: 7000,
		path: "/api/v1/scores?" + get_para,
		method: "PATCH",
	};
	const requ = http.request(options);
	requ.end();
	res.render("kbklab");
});

app.listen(199, function () {
	console.log("Server started on port 199");
});
