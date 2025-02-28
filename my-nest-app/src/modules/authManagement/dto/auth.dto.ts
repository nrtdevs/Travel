import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsInt, IsEnum } from 'class-validator';

@InputType()

export class RegisterUserDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  org_name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  username :string;

  // @Field()
  // @IsEnum(['admin', 'user'], { message: 'placeholder must be admin or user' })
  // placeholder: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  mobileNo?: number;



 
}

@InputType()
export class LoginUserDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @MinLength(6) 
  password: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field()
  username: string;
}
