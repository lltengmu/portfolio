import { currentUser } from '@/decorators/currentUser.decrator'
import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, UseInterceptors } from '@nestjs/common'
import { User } from '@prisma/client'
import { UpdateSocialDto } from './dto/update-social.dto'
import { SocialsService } from './socials.service'

@Controller('socials')
@UseInterceptors(ClassSerializerInterceptor)
export class SocailsController {
  constructor(private readonly socialsService: SocialsService) {}

  @Get('')
  findOne(@currentUser() user: User) {
    return this.socialsService.findOne(user)
  }

  @Patch('')
  update(@currentUser() user: User, @Body() updateSocailDto: UpdateSocialDto) {
    return this.socialsService.update(user.id, updateSocailDto)
  }
}
