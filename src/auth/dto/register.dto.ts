import { IsEmail, IsString, MinLength } from "class-validator"


export class RegisterDto{
    @IsEmail({},{message:'El correo no es válido'})
    email:string

    @IsString({message:'El nombre debe ser una cadena de caracteres'})
    name:string

    @MinLength(6,{message:"El passowrd debe tener mínimo 6 caracteres"})
    password:string
}