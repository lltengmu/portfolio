import { State } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class StateEntity implements Partial<State> {
  @Exclude()
  userId?: number
  constructor(partial: Partial<StateEntity>) {
    Object.assign(this, partial)
  }
}
