# ajv-pretty-validation

Creates pretty output for [`ajv`](https://github.com/epoberezkin/ajv) errors.

## TOCs

  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Usage](#usage)

## Introduction

This package allows you to transform validation errors from [`ajv`](https://github.com/epoberezkin/ajv) into a pretty formatted output.

## Installation

```
npm i ajv @ag-digital/ajv-pretty-validation
```

## Usage

```javascript
const ajvPrettyValidation = require('@ag-digital/ajv-pretty-validation');

const isValid = ajv.validate('person', personData)
if (!isValid) {
  console.log(ajvPrettyValidation(ajv.errors, personData))
}
```

You should then get output similar to:

![Example](/assets/example.png)