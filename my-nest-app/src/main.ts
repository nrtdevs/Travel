import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app/app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {

const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((acc, err) => {
          const constraints = err.constraints
            ? Object.values(err.constraints)
            : ['Validation failed'];
          acc[err.property] = constraints.join(', ');
          return acc;
        }, {});

        return new Error(JSON.stringify(formattedErrors));
      },
    }),
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'default-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, 
    }),
  );

  app.enableCors();

  app.enable('trust proxy');

 
  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.SERVER_PORT || 3000;
  await app.listen(port);
}
bootstrap();
