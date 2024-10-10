import { Experience } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class UpsertExperienceDto implements Partial<Experience> {
  @IsNotEmpty()
  id?: number
  @IsOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  start?: Date
  @IsOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  end?: Date
  @IsOptional()
  company?: string
  @IsOptional()
  position?: string
}
