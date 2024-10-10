import { currentUser } from '@/decorators/currentUser.decrator'
import { Body, ClassSerializerInterceptor, Controller, Get, Patch, UseInterceptors } from '@nestjs/common'
import { User } from '@prisma/client'
import { UpdateStateDto } from './dto/update-state.dto'
import { StateService } from './state.service'

@Controller('state')
@UseInterceptors(ClassSerializerInterceptor)
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get('')
  findOne(@currentUser() user: User) {
    return this.stateService.findOne(user.id)
  }

  @Patch('')
  update(@currentUser() { id }: User, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.update(id, updateStateDto)
  }
}
