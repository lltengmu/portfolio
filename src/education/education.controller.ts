import { currentUser } from '@/decorators/currentUser.decrator'
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateEducationDto } from './dto/create-education.dto'
import { EducationService } from './education.service'

@Controller('education')
@UseInterceptors(ClassSerializerInterceptor)
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  create(@currentUser() user: User, @Body() createEducationDto: CreateEducationDto) {
    return this.educationService.upsert(user, createEducationDto)
  }

  @Get()
  findAll(@currentUser() user: User) {
    return this.educationService.findAll(user)
  }

  @Delete(':id')
  remove(@currentUser() user: User, @Param('id') id: string) {
    return this.educationService.remove(user, +id)
  }
}
