import { GraphQLError } from 'graphql'

import { Repository } from 'typeorm'
import { ErrorCodes, getEnumKeyValuePairs } from './ErrorCodes'
const Handlebars = require('handlebars')

// export const throwGqlError = (code: ErrorCodes) => {
//     const error = getEnumKeyValuePairs(ErrorCodes).find(
//         (error) => error.value === code,
//     )
//     throw new GraphQLError(error.value, {
//         extensions: {
//             code: error.key,
//         },
//     })
// }


export const throwGqlError = (code: ErrorCodes) => {
    const error = getEnumKeyValuePairs(ErrorCodes).find(
        (error) => error.value === code
    );

    if (!error) {
        throw new GraphQLError('Unknown error code', {
            extensions: {
                code: 'UNKNOWN_ERROR',
            },
        });
    }

    throw new GraphQLError(error.value, {
        extensions: {
            code: error.key,
        },
    });
};



export const parseBadUserInput = (error: string) => {
    const regex = /(?:Field \"([^\"]+)\" (.+)|at \"([^\"]+)\"; (.+))/g

    const errors = [...error.matchAll(regex)].reduce((acc, match) => {
        const field = match[1] || match[3] // Extract field name (from either group)
        const error = match[2] || match[4] // Extract error message (from either group)

        const d = field.replaceAll('data.', '')
        const e = error.replaceAll('of ', '').replaceAll('is ', '').trim()
        acc[d] = e
        return acc
    }, {})

    return errors
}







