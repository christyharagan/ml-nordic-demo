var Server = require('markscript-koa').Server
var COMMON = require('./markscriptfile').COMMON
var u = require('uservices')
var fs = require('fs')
var path = require('path')

var serviceSpecs = u.parse(fs.readFileSync('./deployed/service-specs.json').toString())

exports.getServer = function(port) {
  var server = new Server({
    database: {
      databaseName: COMMON.appName + '-content',
      host: COMMON.ml.host,
      port: COMMON.ml.port,
      user: COMMON.ml.user,
      password: COMMON.ml.password
    }, middle: {
      host: COMMON.koa.host,
      port: port || COMMON.koa.port
    },
    serviceSpecs: serviceSpecs,
    fileServerPath: path.join('../client')
  })
  return server.start()
}

exports.clear = function(server) {
  var preperationService = server.getService('preperation')
  return preperationService.clear()
}

exports.loadAnswers = function(server, answers) {
  var preperationService = server.getService('preperation')
  return preperationService.loadAnswers(answers)
}

exports.loadPremises = function(server, premises) {
  var preperationService = server.getService('preperation')
  return preperationService.loadPremises(premises)
}

exports.getAnswers = function(server) {
  var playService = server.getService('play')
  return playService.getPossibleAnswers()
}

exports.submitAnswer = function(server, answerId) {
  var playService = server.getService('play')
  return playService.submitAnswer(answerId)
}

exports.getPremises = function(server) {
  var playService = server.getService('play')
  return playService.getPremises()
}

exports.getResults = function(server) {
  var resultsService = server.getService('results')
  return resultsService.getResults()
}

exports.updateResults = function(server) {
  var resultsService = server.getService('results')
  return resultsService.updateResults()
}
