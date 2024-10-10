import { Supply } from '@prisma/client'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateSupplyDto implements Partial<Supply> {
  @IsNotEmpty()
  id?: number
  @IsOptional()
  title?: string
  @IsOptional()
  description?: string
}
