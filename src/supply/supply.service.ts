import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSupplyDto } from './dto/create-supply.dto'
import { SupplyEntity } from './entities/supply.entity'

@Injectable()
export class SupplyService {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(user: User, dto: CreateSupplyDto) {
    return new SupplyEntity(
      await this.prisma.supply.upsert({
        where: { id: dto.id },
        create: {
          userId: user.id,
          title: dto.title,
          description: dto.description,
        },
        update: {
          title: dto.title,
          description: dto.description,
        },
      }),
    )
  }

  async findAll(user: User) {
    return await this.prisma.supply
      .findMany({
        where: { userId: user.id },
      })
      .then((data) => data.map((i) => new SupplyEntity(i)))
  }

  async remove(id: number) {
    return new SupplyEntity(
      await this.prisma.supply.delete({
        where: { id },
      }),
    )
  }
}
