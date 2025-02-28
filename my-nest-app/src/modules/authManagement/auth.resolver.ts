import { Args, Mutation, Resolver , Query} from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { RegisterUserDto, LoginUserDto, AuthResponse } from "./dto/auth.dto";
import { Users } from "src/common/entities/user.entities";
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  
  constructor(private authService: AuthService) {}

  @Mutation(() => Users)
  async register(
    @Args('registerData') registerData: RegisterUserDto,
  ): Promise<Users> {
    return this.authService.register(registerData);
  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginUserDto): Promise<AuthResponse> {
    try {
      return await this.authService.login(input);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }


  @Query(() => [Users])
  async getAllUsers(): Promise<Users[]> {
    return this.authService.getAllUsers();
  }


  @Mutation(() => String)
  async logout(): Promise<string> {
    return this.authService.logout();
  }
}
