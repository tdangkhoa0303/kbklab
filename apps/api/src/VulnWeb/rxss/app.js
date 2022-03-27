const express = require('express');
const cookieSession = require('cookie-session');
const fs = require('fs');
const dotenv = require('dotenv');
const {isUri} = require('valid-url');
const {Builder} = require('selenium-webdriver');
const {Options} = require('selenium-webdriver/chrome');
const {v4} = require('default-gateway');
const hostname = require('hostname');
const { stringify } = require('querystring');
const { request } = require('http');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.use(
	cookieSession({
		name: 'session',
		keys: ['abc'],
		// Cookie Options
		maxAge: 24 * 60 * 60 * 1000, // 24 hours,
		httpOnly: false,
	}),
);

app.use((req, res, next) => {
	res.locals.user = req.session.user;
	next();
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.get('/logout', (req, res) => {
	req.session.user = '';
	res.redirect('/');
});

app.get(['/homepage', '/'], (req, res) => {
	if (req.cookies && req.cookies.admin && req.cookies.admin === process.env.COOKIE_ADMIN) {
		console.log(1); // tăng điểm
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
			path: '/api/v1/scores?' + get_para,
			method: 'PATCH',
		};
		const req = request(options);
		req.end();
	}
	if (req.session.user && req.session.user !== '') {
		fs.readFile('./data/posts.json', 'utf-8', (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);
				res.render('homepage', {posts: posts});
			}
		});
	} else {
		res.redirect('/login');
	}
});

app.post('/login', (req, res, next) => {
	fs.readFile('./data/users.json', 'utf-8', (err, data) => {
		if (!err) {
			const users = JSON.parse(data);
			users.forEach((user) => {
				if (user.username === req.body.username && user.password === req.body.password) {
					req.session.user = req.body.username;
					res.redirect('/homepage');
				}
			});
		} else {
			res.redirect('/login');
		}
	});
});

app.post('/posts/:postId/comments', (req, res) => {
	if (req.session.user && req.session.user !== '') {
		fs.readFile('./data/posts.json', 'utf-8', (err, data) => {
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
				fs.writeFileSync('./data/posts.json', JSON.stringify(posts), 'utf-8');
			}
		});
		res.redirect('/');
	}
});

app.get('/posts/search', (req, res) => {
	if (req.cookies) {
		console.log(req.cookies);
	}
	if ((req.session.user && req.session.user !== '') || (req.cookies && req.cookies.admin)) {
		fs.readFile('./data/posts.json', 'utf-8', (err, data) => {
			if (!err) {
				const posts = JSON.parse(data);
				let searchPosts = [];

				posts.forEach((post) => {
					if (post.content.indexOf(req.query.content) >= 0) {
						searchPosts.push(post);
					}
				});
				res.render('homepage', {
					posts: searchPosts,
					notify: req.query.content,
				});
			}
		});
	} else {
		res.redirect('/login');
	}
});

app.get('/report', (req, res) => {
	if (req.session.user && req.session.user !== '') {
		res.render('report');
	} else {
		res.redirect('/login');
	}
});

app.post('/report', async (req, res) => {
	if (req.session.user && req.session.user !== '') {
		let url = req.body.content;
		if (isUri(url)) {
			const chromeOption = new Options();
			chromeOption.addArguments('--enable-javascript');
			const headers = req.headers.cookie.split(';');
			let session;
			let sessionSig;
			for (let index = 0; index < headers.length; index++) {
				const element = headers[index];
				if (element.indexOf('session') > -1 && element.indexOf('session.sig') === -1) {
					session = element.slice(element.indexOf('=') + 1);
				}
				if (element.indexOf('session.sig') > -1) {
					sessionSig = element.slice(element.indexOf('=') + 1);
				}
			}
			const driver = await new Builder()
				.forBrowser('chrome')
				.setChromeOptions(
					chromeOption.addArguments('--enable-javascript').headless().addArguments('--no-sandbox'),
				)
				.build();
			const current_url = 'https://' + hostname() + '.kbklab.tech/login';
			console.log(current_url);
			console.log('session:'+session);
			console.log('sig:'+sessionSig);
			await driver.get(current_url);
			await driver.manage().addCookie({name: 'admin', value: process.env.COOKIE_ADMIN});
			await driver.manage().addCookie({name: 'session', value: session});
			await driver.manage().addCookie({name: 'session.sig', value: sessionSig});
			await driver.get(url);
			res.render('report');
		}
	} else {
		res.redirect('/login');
	}
});

app.listen(3000, function () {
	console.log('Server started on port 3000');
});