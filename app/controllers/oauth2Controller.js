const uuid = require('node-uuid');
const crypto = require('crypto');

const oauth2orize = require('oauth2orize');
const Client = require('../models/Client');
const Token = require('../models/Token');
const Code = require('../models/Code');

var server = oauth2orize.createServer();

server.serializeClient(function(client, callback) {
  return callback(null, client._id);
});

server.deserializeClient(function(id, callback) {
  Client.findOne({ _id: id }, function (err, client) {
    if (err) { return callback(err); }
    return callback(null, client);
  });
});

server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback) {
  // Create a new authorization code
  var code = new Code({
    value: uuid.v4(),
    client_id: client._id,
    redirect_uri: redirectUri,
    user_id: user._id
  });

  console.log(code);

  // Save the auth code and check for errors
  code.save(function(err) {
    if (err) { return callback(err); }

    callback(null, code.value);
  });
}));

server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {
  Code.findOne({ value: code }, function (err, authCode) {
    if (err) { return callback(err); }
    if (authCode == null) { return callback(null, false); }
    if (client._id.toString() !== authCode.client_id) { return callback(null, false); }
    if (redirectUri !== authCode.redirect_uri) { return callback(null, false); }

    // Delete auth code now that it has been used
    authCode.remove(function (err) {
      if(err) { return callback(err); }

      // Create a new access token
      var token = new Token({
        value: crypto.randomBytes(256).toString('hex'),
        client_id: authCode.client_id,
        user_id: authCode.user_id
      });

      // Save the access token and check for errors
      token.save(function (err) {
        if (err) { return callback(err); }

        callback(null, token);
      });
    });
  });
}));

exports.authorization = [
  server.authorization(function(clientId, redirectUri, callback) {

    Client.findOne({ _id: clientId }, function (err, client) {
      if (err) { return callback(err); }
      return callback(null, client, redirectUri);
    });
  }),
  function(req, res){
    // res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
    res.send(req.oauth2.transactionID);
  }
];

exports.decision = [
  server.decision()
];

exports.token = [
  server.token(),
  server.errorHandler()
];