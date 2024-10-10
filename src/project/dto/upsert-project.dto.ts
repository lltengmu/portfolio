import { Project } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class UpsertProjectDto implements Partial<Project> {
  @IsNotEmpty()
  nanoid?: string

  @IsNotEmpty()
  title?: string

  @IsOptional()
  @Transform(({ value }) => (value as string).split(','))
  stack?: JsonValue

  @IsOptional()
  description?: string

  @IsOptional()
  github?: string

  @IsOptional()
  live?: string
}
