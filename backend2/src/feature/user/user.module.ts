import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './controller/user.controller';

@Module({
  controllers: [UserController],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService],
})
export class UserModule {}
