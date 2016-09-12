// tests/config.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai


describe('core-init', function () {
  it('core-init should result in an express app', function () {
    var app = require('../app.js');
     
    expect(app).to.not.equal(undefined);
  });
});