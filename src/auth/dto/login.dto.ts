import { Exists } from '@/rules'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Exists('User:email', { message: "You haven't registered yet!" })
  email: string

  @IsNotEmpty()
  password: string
}
