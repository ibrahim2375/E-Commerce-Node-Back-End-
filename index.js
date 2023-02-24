const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // for request safe
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();
//router
const router = require('./src/router');
//data base
const connect_to_db = require('./config/db');

// Variables
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST

const app = express();

// Middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(cors({
    origin: [process.env.ORIGIN_SITE],
    methods: ['GET', 'POST'],
    credentials: true
}));

//router
app.use('/', router);

//server running
app.listen(PORT, () => {
    connect_to_db();
    console.log(`server running successfully on: http://${HOST}:${PORT}`)
})