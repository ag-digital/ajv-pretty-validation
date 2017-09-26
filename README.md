# ajv-pretty-validation

Creates pretty output for [`ajv`](https://github.com/epoberezkin/ajv) errors.

[![npm](https://img.shields.io/npm/v/@ag-digital/ajv-pretty-validation.svg?style=flat-square)](http://npm.im/@ag-digital/ajv-pretty-validation)
[![MIT License](https://img.shields.io/npm/l/@ag-digital/ajv-pretty-validation.svg?style=flat-square)](http://opensource.org/licenses/MIT)

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

```
const ajvPrettyValidation = require('@ag-digital/ajv-pretty-validation');

const isValid = ajv.validate('person', personData)
if (!isValid) {
  console.log(ajvPrettyValidation(ajv.errors, personData))
}
```

You should then get output similar to:

![Example](/assets/example.png)