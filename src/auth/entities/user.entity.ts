import { url } from '@/helper'
import { User } from '@prisma/client'
import { Exclude, Transform } from 'class-transformer'
import * as dayjs from 'dayjs'

export class UserEntity implements Partial<User> {
  @Exclude()
  password: string

  @Transform(({ value }) => value ? url(value) : url('public/avatar.png'))
  avatar?: string

  @Transform(({ value }) => dayjs(value).format("YYYY-MM-DD"))
  birth?: Date
  
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
