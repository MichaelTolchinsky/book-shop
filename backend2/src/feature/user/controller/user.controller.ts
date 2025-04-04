import { Controller, ClassSerializerInterceptor, UseInterceptors, Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    await this.userService.createUser(createUserDto);
    return { message: 'User successfully registered' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() loginUserDto: LoginUserDto): Promise<{ token: string; expiresIn: number; userId: string }> {
    return this.userService.login(loginUserDto);
  }
}
