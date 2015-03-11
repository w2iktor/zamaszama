var express 			= require('express');
var bodyParser 			= require('body-parser');
var unless 				= require('express-unless');
var jwt 				= require("express-jwt");
var requireDirectory 	= require('require-directory');
var log 				= require('./libs/log')(module);
var config 				= require('./libs/config');
var utils 				= require('./libs/utils.js');
var loader          	= require('./libs/loader');
var middlewares     	= require('./middlewares/middlewares');
var adminMiddleware 	= require('./middlewares/adminAuth.js');
var yaml                = require('js-yaml');
var fs                  = require('fs');
var swaggerTools        = require('swagger-tools');
//var routes 				= requireDirectory(module, './routes');

log.debug("Starting application");
var app = express();

log.debug("Attaching plugins");
app.use(middlewares.headerMiddleware);
app.use(middlewares.optionsMiddleware);

app.use(require('compression')());
app.use(require('response-time')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//security
var jwtCheck = jwt({
  secret: config.get('token:secret')
});
jwtCheck.unless = unless;
app.use('/api', jwtCheck.unless({path: '/api/login' }));
app.use('/api', utils.middleware().unless({path: '/api/login' }));
app.use('/api/admin', adminMiddleware.middleware());

// swaggerRouter configuration
var options = {
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// Get document, or throw exception on error
var swaggerDoc = yaml.safeLoad(fs.readFileSync('./api/swagger.yaml', 'utf8'));

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());
});

// error handler
app.use(middlewares.errorMiddleware);

module.exports = app;