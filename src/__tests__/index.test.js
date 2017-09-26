import Ajv from 'ajv'
import prettyValidation from '../index'

describe('prettyValidation()', () => {
  const ajv = new Ajv({
    allErrors: true,
    extendRefs: 'fail'
  })

  ajv.addSchema(
    {
      additionalProperties: false,
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        surname: {
          type: 'string'
        },
        address: {
          additionalProperties: false,
          type: 'object',
          properties: {
            line1: { type: 'string' },
            city: { type: 'string' }
          },
          required: ['line1', 'city']
        },
        contactInfo: {
          additionalProperties: false,
          type: 'object',
          properties: {
            telephone: { type: 'string' },
            email: { type: 'string' }
          },
          required: ['telephone']
        },
        favouriteFruit: {
          additionalItems: false,
          items: {
            type: 'string'
          },
          type: 'array',
          uniqueItems: true
        },
        lovesJson: {
          type: 'boolean'
        }
      },
      required: ['name', 'surname', 'address', 'contactInfo']
    },
    'person'
  )

  const data = {
    name: 'Sean',
    address: {
      line1: 1,
      city: 'london'
    },
    contactInfo: {
      email: 'foo@bar.com'
    },
    favouriteFruit: [
      'banana',
      'banana'
    ],
    lovesJson: 'true'
  }

  it('prints the expected validation output', () => {
    ajv.validate('person', data)
    const actual = prettyValidation(ajv.errors, data)
    console.log(actual)
    expect(actual).toMatchSnapshot()
  })
})
