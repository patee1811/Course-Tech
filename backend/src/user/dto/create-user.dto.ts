import { IsString, IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsEnum(UserRole, { message: 'Role must be either student or teacher' })
  role: UserRole;
}
