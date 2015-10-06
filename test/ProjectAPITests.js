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
      title: "Test project title",
      summary: "Summary of the project",
      description: "Test project long description",
      tags: ["tag1", "tag2"],
      source: "This idea came while I was sitting in class",
      visibility: 0,
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
        res.body.should.have.property('_id');
        res.body.title.should.equal('Test project title');
        res.body.summary.should.equal('Summary of the project');
        res.body.description.should.equal('Test project long description');
        res.body.source.should.equal('This idea came while I was sitting in class');
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
  });

  // GET (one)
  it('should return the object from the database', function(done) {
    request(baseUrl)
      .get('api/projects/' + objectId)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if(err)
          throw err;

        res.body.should.have.property('_id');
        res.body.title.should.equal('Test project title');
        res.body.summary.should.equal('Summary of the project');
        res.body.description.should.equal('Test project long description');
        res.body.source.should.equal('This idea came while I was sitting in class');
        objectId = res.body._id;
        done();
      });
  });

  // PUT
  it('should update the project title', function(done) {

    var project = {
      _id: objectId,
      title: "Updated project title",
      summary: "Updated summary of the project",
      description: "Updated test project long description",
      source: "Updated source",
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
            res.body.title.should.equal('Updated project title');
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