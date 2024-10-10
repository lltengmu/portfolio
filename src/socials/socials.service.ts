import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateSocialDto } from './dto/update-social.dto'
import { SocialEntity } from './entities/social.entity'

@Injectable()
export class SocialsService {
  constructor(private readonly prisma: PrismaService) {}

  async store(user: User) {
    return new SocialEntity(
      await this.prisma.socials.create({
        data: {
          userId: user.id,
        },
      }),
    )
  }

  async findOne(user: User) {
    return new SocialEntity(
      await this.prisma.socials.findUnique({
        where: { userId: user.id },
      }),
    )
  }

  async update(id: number, updateSocialDto: UpdateSocialDto) {
    return new SocialEntity(
      await this.prisma.socials.update({
        where: { userId: id },
        data: updateSocialDto,
      }),
    )
  }
}
