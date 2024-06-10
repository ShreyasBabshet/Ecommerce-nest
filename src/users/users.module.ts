import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from 'src/shared/repository/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from 'src/shared/schema/users.schema';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema
      },
    ])
  ]
})
export class UsersModule {}
