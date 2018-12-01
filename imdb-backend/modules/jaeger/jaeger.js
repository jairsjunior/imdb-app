const promClient = require('prom-client');
const { initTracer, PrometheusMetricsFactory }  = require('jaeger-client');

var config = {
  serviceName: 'imdb_app_backend',
  sampler: {
    type: "const",
    param: 1,
  },
  reporter: {
    collectorEndpoint: 'http://localhost:14268/api/traces',
    logSpans: true,
  }
};
var namespace = config.serviceName;
var metrics = new PrometheusMetricsFactory(promClient, namespace);
var options = {
    tags: {
      'imdb-app-backend.version': '0.0.1',
    },
    metrics: metrics,
    logger: {
        info(msg) {
            console.log("INFO ", msg);
        },
        error(msg) {
            console.log("ERROR", msg);
        },
    },
  };

module.exports = initTracer(config, options);