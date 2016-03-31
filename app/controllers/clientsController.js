var Client = require('../models/Client');
var uuid = require('node-uuid');

exports.postClients = function(req, res) {
  var client = new Client();
  var secret = uuid.v4();
  client.secret = client.generateHash(secret);
  client.user_id = req.user._id;

  client.save(function(err) {
    if (err)
      res.send(err);
    else
      res.json({
        clientId: client._id,
        secret: secret
      });
  });
};

exports.getClients = function(req, res) {
  Client.find({ user_id: req.user._id }, function(err, clients) {
    if (err)
      res.send(err);

    res.json(clients);
  });
};