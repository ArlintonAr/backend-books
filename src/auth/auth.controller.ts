import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth.service';

import {CreateUserDto,UpdateUserDto,LoginDto,RegisterDto}from './dto'
import { AuthGuard } from './guards/guards.guard';

import { User } from './entities/user.entity';
import { LoginResponse } from './interfaces/login-response';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto:LoginDto){
    return this.authService.login(loginDto)
  }

  
  @Post('/register')
  register(@Body() registerDto:RegisterDto){
    return this.authService.register(registerDto)
  }


  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req:Request) {
    /* const user=req['user']
    return user */
    return this.authService.findAll();
  }

  
  //Login Response
  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken(@Request() req:Request):LoginResponse{

    const user=req['user'] as User
    return {
      user,
      token:this.authService.getJwtToken({id:user._id})
    }
  }
 /*  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  } */
}
