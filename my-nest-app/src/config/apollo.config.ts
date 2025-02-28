import { ApolloServerPlugin } from '@apollo/server'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloError } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import GraphQLJSON from 'graphql-type-json'
import { DirectivesManager } from 'src/common/directives/DirectivesManager'
import { LoggingPlugin } from 'src/common/plugins/logging.plugin'
import { parseBadUserInput } from 'src/common/utility/helpers'

// plugins for the ApolloServer
let plugins: ApolloServerPlugin<any>[] = [
  new LoggingPlugin(), // uncomment this line to enable the logging plugin
]

// check if the environment is production or development
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    ApolloServerPluginLandingPageProductionDefault({
      embed: true,
      graphRef: 'myGraph@prod',
    }),
  )
} else {
  plugins.push(ApolloServerPluginLandingPageLocalDefault({ embed: true }))
}

// export the ApolloModule





export const ApolloModule = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  playground: false,
  autoSchemaFile: 'schema.gql',
  transformSchema: (schema) => DirectivesManager.transformSchema(schema),
  installSubscriptionHandlers: true,
  plugins,
  buildSchemaOptions: {
    directives: DirectivesManager.getSchemaDirectives(),
  },
  resolvers: {
    // JSON: GraphQLJSON,
  },
  includeStacktraceInErrorResponses: false,
  formatError: (error) => {
    try {
      const errorDetails = JSON.parse(error.message);
      return {
        message: 'Validation failed',
        extensions: {
          code: 'BAD_USER_INPUT',
          errors: errorDetails,
        },
      };
    } catch (parseError) {
      // Ensure error.extensions exists to avoid further issues
      const errorCode = error.extensions?.code || 'INTERNAL_SERVER_ERROR';

      if (errorCode === 'BAD_USER_INPUT') {
        return {
          message: 'Validation failed',
          extensions: {
            code: 'BAD_USER_INPUT',
            errors: parseBadUserInput(error.message),
          },
        };
      }

      return {
        message: error.message || 'An unexpected error occurred',
        extensions: {
          code: errorCode,
        },
      };
    }
  },
  csrfPrevention: false,
});