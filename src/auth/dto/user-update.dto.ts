import { User } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator'

export class UpdateUserDto implements Partial<User> {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  name?: string

  @IsOptional()
  @IsPhoneNumber('CN')
  phone?: string

  @IsOptional()
  address?: string

  @IsOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  birth?: Date
}
