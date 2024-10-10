import { Educations } from '@prisma/client'
import { Exclude, Transform } from 'class-transformer'
import * as dayjs from 'dayjs'

export class EducationEntity implements Partial<Educations> {
  @Exclude()
  userId: number
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  start: Date
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  end: Date
  constructor(partial: Partial<EducationEntity>) {
    Object.assign(this, partial)
  }
}
