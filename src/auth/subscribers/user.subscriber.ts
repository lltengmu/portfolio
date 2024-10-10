import { UserCreateEvent } from '@/auth/events/user-created'
import { SocialsService } from '@/socials/socials.service'
import { StateService } from '@/state/state.service'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class UserSubscriber {
  constructor(
    private readonly state: StateService,
    private readonly socails: SocialsService,
  ) {}

  @OnEvent('user:created')
  async handleUserCreated(e: UserCreateEvent) {
    await this.state.create(e.user)
    await this.socails.store(e.user)
  }
}
