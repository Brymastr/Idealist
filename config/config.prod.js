var config = module.exports = {};

config.port = 9000;
config.db = 'mongodb://brycen:dorsay@ds041992.mongolab.com:41992/idealist';
config.secret = 'not much of a secret yet';
config.controllersDir = './controllers';
config.modelsDir = './models';
config.routes = './routes';
config.passport = './config/passport';
config.auth = './config/auth';
config.env = 'prod';