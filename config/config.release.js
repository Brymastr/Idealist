var config = module.exports = {};

config.port = 80;
config.db = process.env.DB_CONN;
config.secret = process.env.SECRET;
config.env = process.env.NODE_ENV;
config.url = process.env.API_URL;