import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { email, password } = createUserDto;
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new this.userModel({
      email,
      password: hashedPassword,
      cart: { items: [] },
    });
    await user.save();
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string; expiresIn: number; userId: string }> {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
    const payload = { email: user.email, sub: user._id };
    return {
      token: this.jwtService.sign(payload),
      expiresIn: 3600,
      userId: user._id.toString(),
    };
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid authentication credentials');
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid authentication credentials');
    }
    return user;
  }
}
