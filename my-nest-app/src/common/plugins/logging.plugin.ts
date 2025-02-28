import {
    ApolloServerPlugin,
    GraphQLRequestContext,
    GraphQLRequestListener,
  } from '@apollo/server';
  import { Plugin } from '@nestjs/apollo';
  
  @Plugin()
  export class LoggingPlugin implements ApolloServerPlugin {
    async requestDidStart(
      requestContext: GraphQLRequestContext<any>,
    ): Promise<GraphQLRequestListener<any> | void> {
      // Skip logging in production
      if (process.env.NODE_ENV === 'production') return;
  
      // Skip logging for introspection queries
      if (requestContext.request.operationName === 'IntrospectionQuery') return;
  
      console.log('-');
      console.log(
        `Request for "${requestContext.request.operationName}" started at`,
        new Date().toLocaleTimeString(),
      );
      console.log('-');
  
      return {
        async willSendResponse({ response }) {
          console.log(
            'Response will be sent at',
            new Date().toLocaleTimeString(),
          );
          console.log('-');
        },
        async didEncounterErrors({ errors, request }) {
          console.log('-');
          console.log('Errors:', errors);
          console.log('-');
          console.log('Query:', request.query);
          console.log('-');
          console.log('Variables:', request.variables);
          console.log('-');
        },
      };
    }
  }
  
