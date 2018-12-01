var Register = require('prom-client').register;  
var Counter = require('prom-client').Counter;  
var Histogram = require('prom-client').Histogram;  
var Summary = require('prom-client').Summary;  
var Gauge = require('prom-client').Gauge;
var ResponseTime = require('response-time');  


// Metric to show App and Chart version. Origin from Container parameter
module.exports.appVersionGauge = appVersionGauge = new Gauge({
	name: 'imdb_app_backend_app_chart_version_info',
	help: 'App and chart version info.',
	labelNames: ['app_version']
});

module.exports.httpRequestDurationMicroseconds = httpRequestDurationMicroseconds = new Histogram({
    name: 'imdb_app_backend_http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['route'],
    // buckets for response time from 0.1ms to 500ms
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
  })

module.exports.numOfRequests = numOfRequests = new Counter({  
    name: 'imdb_app_backend_numOfRequests',
    help: 'Number of requests made',
    labelNames: ['method','app_version']
});


module.exports.pathsTaken = pathsTaken = new Counter({  
    name: 'imdb_app_backend_pathsTaken',
    help: 'Paths taken in the app',
    labelNames: ['path']
});

module.exports.responses = responses = new Summary({  
    name: 'imdb_app_backend_responses',
    help: 'Response time in millis',
    labelNames: ['method', 'path', 'status']
});

module.exports.requestCounters = function (req, res, next) {  
    if (req.path != '/metrics') {
        numOfRequests.inc({ method: req.method });
        pathsTaken.inc({ path: req.path });
    }
    next();
}

module.exports.responseCounters = ResponseTime(function (req, res, time) {  
    if(req.url != '/metrics') {
        responses.labels(req.method, req.url, res.statusCode).observe(time);
    }
})

module.exports.responseHistogram = ResponseTime(function (req, res, time) {  
    if(req.url != '/metrics') {
        httpRequestDurationMicroseconds.labels(req.url).observe(time);
    }
})

module.exports.injectMetricsRoute = function (App) {  
    App.get('/metrics', (req, res) => {
        res.set('Content-Type', Register.contentType);
        res.end(Register.metrics());
    });
};


module.exports.startCollection = function () {  
    console.log("metricas disponiveis em /metrics");
    require('prom-client').collectDefaultMetrics({ prefix: process.env.PROMETHEUS_PREFIX || 'imdb_app_backend'});
    appVersionGauge.labels(process.env.APP_VERSION,process.env.CHART_VERSION).set(1);        
};
