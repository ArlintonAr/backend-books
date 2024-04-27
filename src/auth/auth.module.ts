import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature(
      [
       {
         name:User.name,
         schema:UserSchema,
       }
      ]),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '6h' },
    }),

      
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
