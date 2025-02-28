
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/common/entities/user.entities';
import { RegisterUserDto, LoginUserDto, AuthResponse } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private jwtService: JwtService
  ) {}


  async register(registerDto: RegisterUserDto): Promise<Users> {
    const existingUser = await this.usersRepository.findOne({
      where: { username: registerDto.username },
    });

    console.log(existingUser,"user axisted ")

    if (existingUser) {
      throw new UnauthorizedException(`User with username ${registerDto.username} already exists`);
    }

   

    const newUser = this.usersRepository.create({
      ...registerDto,
     
    });

    return await this.usersRepository.save(newUser);
  }



  async login(loginUserDto: LoginUserDto): Promise<AuthResponse> {
  const { username, password } = loginUserDto;

  // Fetch user by email
  const user = await this.usersRepository.findOne({ where: { username } });

  console.log(user,"users data")

  if (!user) {
    throw new UnauthorizedException('User with this email does not exist.');
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid password.');
  }
  console.log(user.password,"password vailed ")

  // Create JWT payload and generate access token
  const payload = { id: user.id, username: user.username, name: user.org_name };
  const accessToken = this.jwtService.sign(payload);

  return {
    accessToken,
    username: user.username,
  };
}

  


async getAllUsers(): Promise<Users[]> {
  return this.usersRepository.find();
}




  async logout(): Promise<string> {
    return 'Logout successful (JWT will expire on its own)';
  }
  
}

