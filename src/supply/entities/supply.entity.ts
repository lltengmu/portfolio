import { Supply } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class SupplyEntity implements Partial<Supply> {
  @Exclude()
  userId?: number
  constructor(partial: Partial<SupplyEntity>) {
    Object.assign(this, partial)
  }
}
