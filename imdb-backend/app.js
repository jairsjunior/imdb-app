const jaeger = require('./modules/jaeger/jaeger');
const middleware = require('express-opentracing').default;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const moviesRouter = require('./routes/movies');
const graphqlRouter = require('./routes/graphql');
const prometheus = require('./modules/prometheus/prometheus');
const { verifyJWT } = require('./modules/login');
const app = express();

app.use(prometheus.requestCounters);
app.use(prometheus.responseCounters);
app.use(prometheus.responseHistogram);

prometheus.injectMetricsRoute(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(middleware({ tracer: jaeger }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use("/graphql", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/movies', moviesRouter);
// app.use('/graphql', verifyJWT , graphqlRouter);
app.use('/graphql', graphqlRouter);

mongoose.connect('mongodb://localhost:27017/imdb');
mongoose.connection.once('open', () => {
    console.log('Database connected!');
})

module.exports = app;