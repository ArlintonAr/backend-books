import { IsEmail, MinLength } from "class-validator";


export class LoginDto{
    
    @IsEmail({},{message:'El correo no es válido'})
    email:string;

    @MinLength(6,{message:"El passowrd debe tener mínimo 6 caracteres"})
    password:string;



}