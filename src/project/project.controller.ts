import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { ProjectService } from './project.service'
import { UpsertProjectDto } from './dto/upsert-project.dto'
import { currentUser } from '@/decorators/currentUser.decrator'
import { User } from '@prisma/client'
import { Image } from '@/upload'
import { PrismaService } from '../prisma/prisma.service'
import { ProjectEntity } from './entities/project.entity'
import { ValidationException } from '@/exceptions/validationException'

@Controller('project')
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  findAll() {
    return this.projectService.findAll()
  }

  @Post()
  @Image()
  upsert(@UploadedFile() file: Express.Multer.File,@currentUser() user: User, @Body() dto: UpsertProjectDto) {
    return this.projectService.upsert(user, dto,file)
  }

  @Get(':id')
  findOne(@currentUser() user: User, @Param('id') id: string) {
    return this.projectService.findOne(user, id)
  }

  @Delete(':id')
  remove(@currentUser() user: User, @Param('id') id: string) {
    return this.projectService.remove(user, id)
  }

  @Post('upload/:id')
  @Image()
  async upload(@UploadedFile() file: Express.Multer.File, @currentUser() user: User, @Param('id') id: string) {
    if (!file) throw new ValidationException({ file: ['Please upload a picture'] })
    return new ProjectEntity(
      await this.prisma.project.update({
        where: { id: +id, userId: user.id },
        data: {
          image: file.path,
        },
      }),
    )
  }
}
