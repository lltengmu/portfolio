import { Injectable } from '@nestjs/common'
import { CreateEducationDto } from './dto/create-education.dto'
import { UpdateEducationDto } from './dto/update-education.dto'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '@prisma/client'
import { EducationEntity } from './entities/education.entity'

@Injectable()
export class EducationService {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User, dto: CreateEducationDto) {
    return new EducationEntity(
      await this.prisma.educations.create({
        data: {
          userId: user.id,
          ...dto,
        },
      }),
    )
  }

  async upsert(user: User, dto: CreateEducationDto) {
    return new EducationEntity(
      await this.prisma.educations.upsert({
        where: { id: dto.id },
        create: {
          institution: dto.institution,
          start: dto.start,
          end: dto.end,
          degree: dto.degree,
          userId: user.id,
        },
        update: {
          institution: dto.institution,
          start: dto.start,
          end: dto.end,
          degree: dto.degree,
        },
      }),
    )
  }

  async findAll(user: User) {
    return await this.prisma.educations
      .findMany({
        where: { userId: user.id },
      })
      .then((data) => data.map((i) => new EducationEntity(i)))
  }

  findOne(id: number) {
    return `This action returns a #${id} education`
  }

  async update(user: User, id: number, data: UpdateEducationDto) {
    return new EducationEntity(
      await this.prisma.educations.update({
        where: {
          id,
          userId: user.id,
        },
        data,
      }),
    )
  }

  async remove(user: User, id: number) {
    return await this.prisma.educations.delete({
      where: {
        id,
        userId: user.id,
      },
    })
  }
}
