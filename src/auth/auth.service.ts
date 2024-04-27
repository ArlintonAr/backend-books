import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';




import { User } from './entities/user.entity';

import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';

import { LoginDto, RegisterDto, CreateUserDto, UpdateUserDto } from './dto';




@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService

  ) {

  }



  async create(createUserDto: CreateUserDto): Promise<User> {

    try {

      //Encriptar contraseña
      const { password, ...userData } = createUserDto

      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      })
      

      //guardar ususario
      
      





      //Generar JWT

      await newUser.save();

      const { password: _, ...user } = newUser.toJSON()

      return user

    } catch (error) {

      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} ya existe!`)

      }
      throw new InternalServerErrorException('Error interno en el servidor')
    }

    //Manejar errores try catch



  }

  /*  signIn and SignUp   */

  async register(registerDto: RegisterDto): Promise<LoginResponse> {

    const user=await this.create(registerDto)


    return {
      user,
      token:this.getJwtToken({ id: user._id })

    }

  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {

    const { email, password } = loginDto

    const user = await this.userModel.findOne({ email })

    if (!user) {
      throw new UnauthorizedException('Credenciales no válidas')
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales no válidas')
    }

    const { password: _, ...rest } = user.toJSON()



    return {
      user: rest,
      token: this.getJwtToken({ id: user.id })
    }


  }





  findAll():Promise<User[]> {
    return this.userModel.find()
  }

 async findUserById(id:string){
    const user=await this.userModel.findById(id)
    const {password, ...rest}=user.toJSON()
    return rest;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }



  /* ***************************************** */

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }
}
