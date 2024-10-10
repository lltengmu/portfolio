import { Experience } from '@prisma/client'
import { Exclude, Transform } from 'class-transformer'
import * as dayjs from 'dayjs'

export class ExperienceEntity implements Partial<Experience> {
  @Exclude()
  userId: number
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  start: Date
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  end: Date
  constructor(partial: Partial<ExperienceEntity>) {
    Object.assign(this, partial)
  }
}
