/**
 * Created by Brycen on 2015-06-12.
 */

var assert = require('assert');
var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config/config');

describe('Projects', function() {
  var baseUrl = "http://localhost:9000/";
  var objectId = null;


  // Before starting any tests
  before(function(done) {
    mongoose.connect(config.db);
    done();
  });

  // POST
  it('should create a new project in the database and return it', function(done) {
    var project = {
      name: "Test project name",
      short_description: "Test project short description",
      long_description: "Test project long description",
      date_created: new Date(2015, 1, 1),
      date_updated: new Date(2015, 2, 2)
    };

    request(baseUrl)
      .post('api/projects/')
      .send(project)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err)
          throw err;
        console.log(res);
        res.body.should.have.property('_id');
        res.body.name.should.equal('Test project name');
        res.body.short_description.should.equal('Test project short description');
        res.body.long_description.should.equal('Test project long description');
        objectId = res.body._id;
        done();
      });
  });

  // GET (all)
  it('should return a list of all projects in the database', function(done) {
    request(baseUrl)
      .get('api/projects')
      .expect(200)
      .end(function(err, res) {
        if(err)
          throw err;

        res.body.should.not.be.empty;
        done();
      });
  })

  // GET (one)
  it('should return the object from the database', function(done) {
    request(baseUrl)
      .get('api/projects/' + objectId)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err)
          throw err;

        res.body._id.should.equal(objectId);
        res.body.name.should.equal('Test project name');
        res.body.short_description.should.equal('Test project short description');
        res.body.long_description.should.equal('Test project long description');
        done();
      });
  });

  // PUT
  it('should update the project name', function(done) {

    var project = {
      _id: objectId,
      name: "Updated project name",
      short_description: "Test project short description",
      long_description: "Test project long description",
      date_created: new Date(2015, 1, 1),
      date_updated: new Date(2015, 2, 2)
    };

    request(baseUrl)
      .put('api/projects/')
      .send(project)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err)
          throw err;

        request(baseUrl)
          .get('api/projects/' + objectId)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if(err)
              throw err;

            res.body._id.should.equal(objectId);
            res.body.name.should.equal('Updated project name');
            done();
          })
      })
  });

  // DELETE
  it('should delete the project in the database', function(done) {
    request(baseUrl)
      .delete('api/projects/' + objectId)
      .expect(200)
      .end(function(err, res) {
        if(err)
          throw err;

        request(baseUrl)
          .get('api/projects/' + objectId)
          .expect(204)
          .end(function(err, res) {
            if(err) throw err;
            done();
          });
      });
  });
});