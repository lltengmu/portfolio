import { Educations } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'

export class UpdateEducationDto implements Partial<Educations> {
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
