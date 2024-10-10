import { State } from '@prisma/client'
import { Transform, Type } from 'class-transformer'
import { IsInt, isNumber, IsNumber, IsNumberString, IsOptional } from 'class-validator'

export class UpdateStateDto implements Partial<State> {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  Years_of_experience: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  Projects_completed: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  Technologies_mastered: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  Code_commits: number
}
