import { User } from '@prisma/client'

export class UserCreateEvent {
  constructor(public readonly user: User) {}
}
