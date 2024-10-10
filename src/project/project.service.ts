import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { UpsertProjectDto } from './dto/upsert-project.dto'
import { PrismaService } from '../prisma/prisma.service'
import { ProjectEntity } from './entities/project.entity'

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.project.findMany().then((data) => data.map((i) => new ProjectEntity(i)))
  }

  async upsert(user: User, dto: UpsertProjectDto, file: Express.Multer.File) {
    let helper = { userId: user.id }
    if (file) Object.assign(helper, { ...dto, image: file.path })
    else Object.assign(helper, { ...dto })

    return new ProjectEntity(
      await this.prisma.project.upsert({
        where: { nanoid: dto.nanoid },
        create: helper as any,
        update: helper,
      }),
    )
  }

  async findOne(user: User, nanoid: string) {
    return new ProjectEntity(
      await this.prisma.project.findUnique({
        where: {
          userId: user.id,
          nanoid,
        },
      }),
    )
  }

  async remove(user: User, nanoid: string) {
    return new ProjectEntity(
      await this.prisma.project.delete({
        where: {
          userId: user.id,
          nanoid,
        },
      }),
    )
  }
}
