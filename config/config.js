//we have three ways to specify DATABASE_URL: 
//through an environment variable, 
//within the application using a global variable, 
//or else we default to a local database value
exports.DATABASE_URL =	process.env.DATABASE_URL ||
						global.DATABASE_URL ||
						'mongodb://localhost/cerebro';

exports.TEST_DATABASE_URL =	process.env.TEST_DATABASE_URL ||
							global.TEST_DATABASE_URL ||
							'mongodb://localhost/test-cerebro';

exports.PORT = process.env.PORT || 8080;
