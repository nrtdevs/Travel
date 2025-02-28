// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Repository } from 'typeorm';
// import { Users } from '../entities/user.entities';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectRepository(Users)
//     private readonly userRepository: Repository<Users>,
//   ) {
//     const secretKey = process.env.JWT_SECRET_KEY;

//     if (!secretKey) {
//       throw new Error('JWT_SECRET_KEY is not defined in the environment');
//     }

//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: secretKey,
//     });
//   }

  
//   async validate(payload: any) {
//     const user = await this.userRepository.findOne({
//       where: { id: payload.sub },
//       relations: ['role', 'company'], 
//     });

//     if (!user) {
//       throw new UnauthorizedException();
//     }

//     return user; 
//   }
// }



import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/common/entities/user.entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secretkey',
    });
  }

  async validate(payload: { username: string; sub: number }) {
    const user = await this.userRepository.findOne({ where: { id: payload.sub } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
