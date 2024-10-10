import { currentUser } from '@/decorators/currentUser.decrator'
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserDto } from './dto/user-update.dto'
import { UserEntity } from './entities/user.entity'
import { ValidationException } from '@/exceptions/validationException'
import { Document, Image, PDF, upload } from '@/upload'
import { ResumeEntity } from './entities/resume.entity'

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('current')
  async findOne(@currentUser() user: User) {
    return new UserEntity(user)
  }

  @Patch()
  async update(@currentUser() user: User, @Body() dto: UpdateUserDto) {
    if (dto.email && user.email !== dto.email) {
      const exists = await this.prisma.user.findUnique({ where: { email: dto.email } })
      if (exists) {
        throw new ValidationException({ email: ['This email address has already been registered.'] })
      }
    }

    const refresh = await this.prisma.user.update({
      where: { email: user.email },
      data: dto,
    })
    return new UserEntity(refresh)
  }

  @Post('avatar')
  @Image()
  async uploadUserAvatar(@UploadedFile() file: Express.Multer.File, @currentUser() user: User) {
    return new UserEntity(
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          avatar: file.path,
        },
      }),
    )
  }

  @Get('resume')
  async resume(@currentUser() user: User) {
    return await this.prisma.resume
      .findMany({
        where: {
          userId: user.id,
        },
      })
      .then((data) => data.map((i) => new ResumeEntity(i)))
  }

  @Post('resume')
  @PDF()
  async uploadUserResume(@UploadedFile() file: Express.Multer.File, @currentUser() user: User) {
    const { filename, path } = file
    return new ResumeEntity(
      await this.prisma.resume.upsert({
        where: { userId: user.id },
        create: {
          name: filename,
          path,
          userId: user.id,
        },
        update: {
          name: filename,
          path,
        },
      }),
    )
  }
}
