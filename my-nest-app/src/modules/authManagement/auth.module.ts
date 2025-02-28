
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { Users } from 'src/common/entities/user.entities';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/jwt/jwt.strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([Users]), 
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'your_secret_key',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
