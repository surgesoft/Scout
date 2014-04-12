/*globals describe, it*/
var
    assert = require('assert') ,
    path = require('path'),
    should = require('should'),
    api = require('../../server/api/index'),
    config = require('../../server/config/index'),
    model = require('../../server/models/index'),
    fs = require('fs'),
    setTestEnv = require('./index');

require("mocha-as-promised")();

describe("Subject Api Test", function () {

    process.env.NODE_ENV = 'testing';

    before(setTestEnv);

    it ("subject add test", function() {
        var _subject = {
            name : 'test',
            url : 'www.baidu.com',
            description: 'test subject'
        };

        return api.subject.add(_subject).then(function (subject) {
            subject.get('name').should.equal('test');
            subject.get('url').should.equal('www.baidu.com');
        });
    });

    it("browse subject test", function () {
        return api.subject.browse().then(function (subjects){
            subjects.length.should.be.above(0);
        });
    });

    it("subject find none test", function () {
       return api.subject.read({
           name : new Date().toString()
       }).otherwise(function (err) {
           err.errorCode.should.equal(404);
       });
    });

    it("subject find test", function () {
       return api.subject.read({
           name : 'test'
       }).then(function (subject) {
          console.log('find subject:', subject);
          subject.name.should.equal('test');
       });
    });

    it("update subject test", function (){
        return api.subject.edit({
            name : 'test'
        }, {
            url : 'www.google.com'
        }).then(function (subject){
            subject.url.should.equal('www.google.com');
        });
    });

});