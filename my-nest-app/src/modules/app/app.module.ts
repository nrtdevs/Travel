import { Module } from '@nestjs/common'
import { ApolloModule } from 'src/config/apollo.config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolve';
import { AppService } from './app.service';
import * as GraphQLJSON from 'graphql-type-json'; 
import { AuthModule } from '../authManagement/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';


import { DatabaseModule} from 'src/config/typeorm.config'


@Module({
  imports: [
    DatabaseModule,
    ApolloModule,
     AuthModule,
  ],
  
   providers: [AppResolver,JwtModule], 

})
export class AppModule {}





