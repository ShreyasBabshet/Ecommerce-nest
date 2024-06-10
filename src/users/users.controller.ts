import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUser: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const loginResponse = await this.usersService.login(
      loginUser.email,
      loginUser.password,
    );
    if (loginResponse.success) {
      response.cookie('auth_token', loginResponse?.result?.token, {
        httpOnly: true,
      });
    }
    // delete loginResponse.result?.token;
    return loginResponse;
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('/verify-email/:otp/:email')
  async verifyEmail(@Param('otp') otp: string, @Param('email') email: string) {
    return await this.usersService.verifyEmail(otp, email);
  }

  @Get('/resend-otp/:email')
  async resentOtpEmail(@Param('email') email: string) {
    return await this.usersService.resendOtp(email);
  }

  @Put('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('auth_token')
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Logged out successfully',
    })
  }
}
