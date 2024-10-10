import { Educations } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateEducationDto implements Partial<Educations> {
  @IsNotEmpty()
  id?: number
  @IsOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  start?: Date
  @IsOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  end?: Date
  @IsOptional()
  institution?: string
  @IsOptional()
  degree?: string
}
