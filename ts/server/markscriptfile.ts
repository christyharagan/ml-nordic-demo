import {BuildOptions} from 'markscript'
import {RunOptions} from 'markscript-koa'
import {UServicesPlugin, UServicesBuildOptions} from 'markscript-uservices'
import {MLNordicDemo} from './lib/databaseModel'
import * as path from 'path'

export const COMMON = {
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

export const buildOptions: BuildOptions = {
  database: {
    host: COMMON.ml.host,
    httpPort: COMMON.ml.port,
    adminPort: 8001,
    configPort: 8002,
    user: COMMON.ml.user,
    password: COMMON.ml.password,
    modelObject: new MLNordicDemo(COMMON.appName, COMMON.ml.host, COMMON.ml.port),
    modules: './lib/**/*.ts'
  },
  middle: {
    host: 'localhost',
    port: 8080
  },
  plugins: {
    uservices: [UServicesPlugin, {}]
  }
}

// export function runOptions(buildOptions: BuildOptions): RunOptions {
//   return {
//     database: {
//       host: COMMON.ml.host,
//       port: COMMON.ml.port,
//       user: COMMON.ml.user,
//       password: COMMON.ml.password,
//       databaseName: COMMON.appName + '-content'
//     },
//     middle: COMMON.koa,
//     serviceSpecs: (<UServicesBuildOptions>buildOptions.plugins['uservices']).serviceSpecs,
//     fileServerPath: path.join(__dirname, '../client')
//   }
// }
