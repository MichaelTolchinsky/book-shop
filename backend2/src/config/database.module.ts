import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('MONGO_ATLAS_USER')}:${configService.get<string>('MONGO_ATLAS_PW')}@${configService.get<string>('MONGO_ATLAS_CLUSTER')}/${configService.get<string>('MONGO_DB_NAME')}`,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}