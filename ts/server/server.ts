import {Server} from 'markscript-koa'
import {COMMON} from './markscriptfile'
import {MLServices} from 'markscript-uservices'
import {PlayService} from './lib/services/playService'
import {PreperationService} from './lib/services/preperationService'
import {Answer} from './lib/models/answer'
import {Statement} from './lib/models/statement'
import {ResultsService} from './lib/services/resultsService'
import * as u from 'uservices'
import * as fs from 'fs'
import * as path from 'path'

let serviceSpecs = <MLServices>u.parse(fs.readFileSync('./deployed/service-specs.json').toString())

export function getServer(port?: number) {
  let server = new Server({
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

export function clear(server: Server) {
  let preperationService = <PreperationService>server.getService('preperation')
  return preperationService.clear()
}

export function loadAnswers(server: Server, answers: Answer[]) {
  let preperationService = <PreperationService>server.getService('preperation')
  return preperationService.loadAnswers(answers)
}

export function loadPremises(server: Server, premises: Statement[]) {
  let preperationService = <PreperationService>server.getService('preperation')
  return preperationService.loadPremises(premises)
}

export function getAnswers(server: Server) {
  let playService = <PlayService>server.getService('play')
  return playService.getPossibleAnswers()
}

export function submitAnswer(server: Server, answerId: number) {
  let playService = <PlayService>server.getService('play')
  return playService.submitAnswer(answerId)
}

export function getPremises(server: Server) {
  let playService = <PlayService>server.getService('play')
  return playService.getPremises()
}

export function getResults(server: Server) {
  let resultsService = <ResultsService>server.getService('results')
  return resultsService.getResults()
}

export function updateResults(server: Server) {
  let resultsService = <ResultsService>server.getService('results')
  return resultsService.updateResults()
}
