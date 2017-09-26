import { readFileSync } from 'fs'
import prettyBytes from 'pretty-bytes'
import compose from 'lodash.compose'
import { sync as gzipSizeSync } from 'gzip-size'
import { getPackageJson, exec } from '../utils'

const nodeEnv = Object.assign({}, process.env, {
  NODE_ENV: 'production'
})

exec('cross-env BABEL_ENV=commonjs babel --ignore **/__tests__ ./src -d ./commonjs')
exec(
  'cross-env BABEL_ENV=umd webpack --config ./tools/webpack/umd.config.babel.js',
  nodeEnv
)
exec(
  'cross-env BABEL_ENV=umd webpack --config ./tools/webpack/umd-min.config.babel.js',
  nodeEnv
)

function fileGZipSize(path) {
  return compose(
    prettyBytes,
    gzipSizeSync,
    readFileSync
  )(path)
}

const umdMinFilePath = `umd/${getPackageJson().name}.min.js`

console.log(`\ngzipped, the UMD build is ${fileGZipSize(umdMinFilePath)}`)
