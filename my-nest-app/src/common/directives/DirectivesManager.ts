import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import {
  defaultFieldResolver,
  DirectiveLocation,
  GraphQLDirective,
  GraphQLSchema,
} from 'graphql'

export class DirectivesManager {

  // Generic method to apply any directive

  
  private static applyDirective(
    schema: GraphQLSchema,
    directiveName: string,
    transformFn: (value: any) => any,
  ): GraphQLSchema {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const upperDirective = getDirective(
          schema,
          fieldConfig,
          directiveName,
        )?.[0]

        if (upperDirective) {
          const { resolve = defaultFieldResolver } = fieldConfig

          // Replace the original resolver with a function that *first* calls
          // the original resolver, then converts its result to upper case
          fieldConfig.resolve = async function (source, args, context, info) {
            const result = await resolve(source, args, context, info)
            if (result) {
              return transformFn(result)
            }
            return result
          }
          return fieldConfig
        }
      },
    })
  }

  // Method to get the schema directives
  static getSchemaDirectives(): GraphQLDirective[] {
    return [
      new GraphQLDirective({
        name: 'upper',
        locations: [
          DirectiveLocation.FIELD_DEFINITION,
          DirectiveLocation.OBJECT,
        ],
      }),
      new GraphQLDirective({
        name: 'lower',
        locations: [
          DirectiveLocation.FIELD_DEFINITION,
          DirectiveLocation.OBJECT,
        ],
      }),
    ]
  }

  // Method to transformSchema
  static transformSchema(schema: GraphQLSchema): GraphQLSchema {
    // Apply the "upper" directive
    schema = DirectivesManager.applyUpperCaseDirective(schema)

    // Apply the "lower" directive
    schema = DirectivesManager.applyLowerCaseDirective(schema)

    return schema
  }

  // Method to apply the "upper" transformation
  static applyUpperCaseDirective(schema: GraphQLSchema): GraphQLSchema {
    return DirectivesManager.applyDirective(schema, 'upper', (value: string) =>
      value.toUpperCase(),
    )
  }

  // Method to apply the "lower" transformation
  static applyLowerCaseDirective(schema: GraphQLSchema): GraphQLSchema {
    return DirectivesManager.applyDirective(schema, 'lower', (value: string) =>
      value.toLowerCase(),
    )
  }
}
