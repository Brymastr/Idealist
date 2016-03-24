var Client = require('../models/Client');
var uuid = require('node-uuid');

exports.postClients = function(req, res) {
  var client = new Client();

  client.name = req.body.name;
  client.secret = req.body.secret;
  client.user_id = req.user._id;

  client.save(function(err) {
    if (err)
      res.send(err);
    else
      res.json({message: 'Client added', data: client});
  });
};

exports.getClients = function(req, res) {
  Client.find({ user_id: req.user._id }, function(err, clients) {
    if (err)
      res.send(err);

    res.json(clients);
  });
};