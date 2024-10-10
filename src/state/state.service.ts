import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateStateDto } from './dto/update-state.dto'
import { StateEntity } from './entities/state.entity'

@Injectable()
export class StateService {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User) {
    return await this.prisma.state.create({
      data: {
        userId: user.id,
      },
    })
  }

  async findOne(id: number) {
    return new StateEntity(
      await this.prisma.state.findUnique({
        where: {
          userId: id,
        },
      }),
    )
  }

  async update(id: number, data: UpdateStateDto) {
    return new StateEntity(
      await this.prisma.state.update({
        where: { userId: id },
        data,
      }),
    )
  }
}
