import chalk from 'chalk'

// :: number -> String
const createEmptyString = length => (new Array(length + 1)).join(' ')

// :: Array<String> -> String
const toDataPath = path => `.${path.join('.')}`

// :: (Array<AJVError>, Array<String>) -> ?String
const getError = (errors, path) => {
  const valueErrorDataPath = toDataPath(path)
  const error = errors.find(x => x.dataPath === valueErrorDataPath)
  return error
    ? error.message
    : undefined
}

// :: (Array<AJVError>, Object, ?Array<String>) -> String
const createValidationString = (errors, data, path = []) => {
  const properties = Object.keys(data).reduce((acc, cur) => {
    const value = data[cur]
    const curPath = path.concat([cur])
    const stringifiedValue = typeof value !== 'object'
      ? JSON.stringify(value)
      : Array.isArray(value)
      ? `[${value.map(x => JSON.stringify(x)).join(', ')}]`
      : `${createValidationString(errors, value, curPath)}`
    const error = getError(errors, curPath)
    const keyValueString = `"${cur}": ${stringifiedValue}`
    return acc.concat(error
        ? [chalk.red(keyValueString), chalk.magenta(`^ "${cur}" ${error}`)]
        : [keyValueString])
  }, [])
  const indent = createEmptyString(path.length * 2)
  return `{\n${properties.map(x => `${indent}  ${x}`).join('\n')}\n${indent}}`
}

export default function prettyValidation(errors, data) {
  if (errors == null || !Array.isArray(errors)) {
    throw new Error('You must provide the ajv errors as the first parameter')
  }
  if (data == null || typeof data !== 'object') {
    throw new Error('You must provide the json data object that the errors relate to as the second parameter')
  }
  return createValidationString(errors, data)
}
