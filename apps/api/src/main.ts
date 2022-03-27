import v1Router from 'app/v1';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import init from 'init';
import path from 'path';
import {environment} from './environments/environment';

init();

const {jwtCookieSecret} = environment;

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(jwtCookieSecret));
app.use(
  session({
    secret: jwtCookieSecret,
    saveUninitialized: true,
    resave: false,
    cookie: {secure: true},
  }),
);

app.use('/api/v1', v1Router)

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
