import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '@prisma/client'
import { UpsertExperienceDto } from './dto/upsert-expeirence.dto'
import { ExperienceEntity } from './entities/expeirence.entity'

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.experience.findMany().then((data) => data.map((i) => new ExperienceEntity(i)))
  }

  async upsert(user: User, dto: UpsertExperienceDto) {
    return new ExperienceEntity(
      await this.prisma.experience.upsert({
        where: { id: dto.id },
        create: {
          start: dto.start,
          end: dto.end,
          company: dto.company,
          position: dto.position,
          userId: user.id,
        },
        update: dto,
      }),
    )
  }

  findOne(id: number) {
    return `This action returns a #${id} expeirence`
  }

  async remove(user: User, id: number) {
    return await this.prisma.experience.delete({
      where: {
        id,
        userId: user.id,
      },
    })
  }
}
