import { currentUser } from '@/decorators/currentUser.decrator'
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { User } from '@prisma/client'
import { UpsertExperienceDto } from './dto/upsert-expeirence.dto'
import { ExperienceService } from './experience.service'

@Controller('experience')
export class ExperienceController {
  constructor(private readonly expeirenceService: ExperienceService) {}

  @Post()
  upsert(@currentUser() user: User, @Body() dto: UpsertExperienceDto) {
    return this.expeirenceService.upsert(user, dto)
  }

  @Get()
  findAll() {
    return this.expeirenceService.findAll()
  }

  @Delete(':id')
  remove(@currentUser() user: User, @Param('id') id: string) {
    return this.expeirenceService.remove(user, +id)
  }
}
