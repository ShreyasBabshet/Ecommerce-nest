import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userTypes } from 'src/shared/schema/users.schema';
import config from 'config';
import { UserRepository } from 'src/shared/repository/user.repository';
import {
  comparePassword,
  generateHashPassword,
} from 'src/shared/utility/password-manager';
import { sendEmail } from 'src/shared/utility/mailHandler';
import { generateAuthToken } from 'src/shared/utility/token-generator';


@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository) private readonly userDb: UserRepository,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto)
      createUserDto.password = await generateHashPassword(
        createUserDto.password,
      );

      if (
        createUserDto.type === userTypes.ADMIN &&
        createUserDto.secretToken !== config.get('adminSecretToken')
      ) {
        throw new Error('Not Allowed to create admin');
      } else if (createUserDto.type !== userTypes.CUSTOMER) {
        createUserDto.isVerified = true;
      }

      const user = await this.userDb.findOne({
        email: createUserDto.email
      });
      if (user) {
        throw new Error('User Already exists');
      }

      const otp = Math.floor(Math.random() * 900000) + 100000;
      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);
      const newUser = await this.userDb.create({
        ...createUserDto,
        otp,
        otpExpiryTime,
      })
      if (newUser.type !== userTypes.ADMIN) {
        sendEmail(
          newUser.email,
          'verifyOtp',
          'Email Verification - Amazon',
          `Your otp is ${otp}`
        )
      }
      return {
        success: true,
        message: newUser.type === userTypes.ADMIN ? 'Admin Created' : 'Please active your account by verifying your email. we have sent you a email with otp',
        result: { email: newUser.email }
      }
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userDb.findOne({
        email
      });
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.isVerified) {
        throw new Error('Please verify your email');
      }
      const isPasswordMatched = await comparePassword(password, user.password);
      if (!isPasswordMatched) {
        throw new Error('Invalid Email or Password');
      }
      const token = await generateAuthToken(user._id);
      return {
        success: true,
        message: 'Login Succesfull',
        result: {
          user: {
            name: user.name,
            email: user.email,
            type: user.type,
            id: user._id.toString(),
          },
          token
        }
      }
    }
    catch (e) {
      throw e;
    }
  }
  async verifyEmail(otp: string, email: string) {
    try {
      const user = await this.userDb.findOne({
        email,
      });
      if (!user) {
        throw new Error("User not found");
      }
      if (user.otp !== otp) {
        throw new Error("OTP does not match");
      }
      console.log(user.otpExpiryTime);
      if (user.otpExpiryTime instanceof Date && user.otpExpiryTime < new Date()) {
        throw new Error('Otp expired');
      }
      user.isVerified = true;
      await user.save();
      await this.userDb.updateOne(
        {
          email
        },
        {
          isVerified: true
        }
      )
      return {
        success: true,
        message: "Email verified successfully"
      }
    }
    catch (e) {
      throw new Error(e);
    }
  }
  async resendOtp(email: string) {
    try {
      const user = await this.userDb.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      if (user.isVerified) {
        throw new Error("User already verified");
      }
      const otp = Math.floor(Math.random() * 900000) + 100000;
      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);
      await this.userDb.updateOne({
        email
      },
        {
          otp,
          otpExpiryTime
        })
      sendEmail(
        user.email,
        'amazon@org.com',
        'Email Verification - Amazon',
        `Your otp is ${otp}`
      )
      return {
        success: true,
        message: 'Otp sent successfully',
        result: { email: user.email }
      }
    }
    catch (e) {
      throw new Error(e);
    }
  }
  async findAll() {
    try {
      const users = await this.userDb.findAll({ type: userTypes.CUSTOMER });
      if (!users.length) {
        throw new Error('No Users Found');
      }
      return {
        success: true,
        message: 'All users fetched',
        result: {
          users
        }
      }
    }
    catch (e) {
      throw new Error(e);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
// function generateHashPassword(): string | PromiseLike<string> {
//   throw new Error('Function not implemented.');
// }

