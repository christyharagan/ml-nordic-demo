var UServicesPlugin = require('markscript-uservices').UServicesPlugin
var logicRuleSet = require('./lib/logicRuleSet').logicRuleSet
var path = require('path')
var databaseModel = require('./lib/databaseModel').databaseModel

var COMMON = {
  appName: 'ml-nordic-demo',
  ml: {
    port: 8008,
    host: 'christys-macbook-pro.local',
    user: 'admin',
    password: 'passw0rd'
  },
  koa: {
    host: 'localhost',
    port: 8080
  }
}

exports.COMMON = COMMON

exports.buildOptions = {
  database: {
    host: COMMON.ml.host,
    httpPort: COMMON.ml.port,
    adminPort: 8001,
    configPort: 8002,
    user: COMMON.ml.user,
    password: COMMON.ml.password,
    modules: './lib/**/*.js',
    ruleSets: [logicRuleSet()],
    model: databaseModel(COMMON)
  },
  middle: {
    host: 'localhost',
    port: 8080
  },
  plugins: {
    uservices: [UServicesPlugin, {}]
  }
}
//
// export function runOptions(buildOptions) {
//   return {
//     database: {
//       host: COMMON.ml.host,
//       port: COMMON.ml.port,
//       user: COMMON.ml.user,
//       password: COMMON.ml.password,
//       databaseName: COMMON.appName + '-content'
//     },
//     middle: COMMON.koa,
//     serviceSpecs: buildOptions.plugins['uservices'].serviceSpecs,
//     fileServerPath: path.join(__dirname, '../client')
//   }
// }
