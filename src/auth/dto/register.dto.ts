import { Same } from '@/rules'
import { Unique } from '@/rules'
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  @Unique('User:email', { message: 'This email address has already been registered.' })
  email: string

  @IsNotEmpty()
  @Length(5)
  password: string

  @IsNotEmpty()
  @Same('password', { message: 'Confirm password is inconsistent with password' })
  password_confirmation: string
}
