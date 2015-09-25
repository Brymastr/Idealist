var config = module.exports = {};

config.port = 9000;
config.db = 'mongodb://localhost/idealist';
config.secret = 'not much of a secret yet';
config.controllersDir = './app/controllers/';
config.routes = './app/routes';
config.passport = './config/passport';
config.auth = './config/auth';
config.env = 'dev';