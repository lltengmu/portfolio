import { url } from '@/helper'
import { Resume } from '@prisma/client'
import { Exclude, Transform } from 'class-transformer'

export class ResumeEntity implements Partial<Resume> {
  @Exclude()
  userId?: number
  @Transform(({value}) => /http|https/ig.test(value) ? value : url(value))
  path?: string
  constructor(partial: Partial<ResumeEntity>) {
    Object.assign(this, partial)
  }
}
