import { url } from '@/helper'
import { Project } from '@prisma/client'
import { Exclude, Transform } from 'class-transformer'

export class ProjectEntity implements Partial<Project> {
  @Exclude()
  id?: number
  @Exclude()
  userId?: number
  @Transform(({value}) => /http|https/ig.test(value) ? value : url(value))
  image?: string
  constructor(partial: Partial<ProjectEntity>) {
    Object.assign(this, partial)
  }
}
