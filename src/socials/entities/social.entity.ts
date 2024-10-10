import { Socials } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class SocialEntity implements Partial<Socials> {
  @Exclude()
  userId?: number
  constructor(partial: Partial<SocialEntity>) {
    Object.assign(this, partial)
  }
}
